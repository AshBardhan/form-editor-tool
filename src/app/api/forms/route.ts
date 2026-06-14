import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { CreateFormSchema } from "@/lib/schema/formSchema";
import { ValidationError, InternalServerError } from "@/lib/errors";

function toSlug(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "untitled-form";
}

/**
 * Generates a unique title and slug pair so newly created forms do not collide.
 */
async function generateUniqueFormIdentity(baseTitle: string, baseSlug: string) {
  let suffix = 0;

  while (suffix < 1000) {
    const title = suffix === 0 ? baseTitle : `${baseTitle} (${suffix + 1})`;
    const slug = suffix === 0 ? baseSlug : `${baseSlug}-${suffix + 1}`;

    const existing = await prisma.form.findFirst({
      where: {
        OR: [{ title }, { slug }],
      },
      select: { id: true },
    });

    if (!existing) {
      return { title, slug };
    }

    suffix += 1;
  }

  throw new InternalServerError("Unable to generate a unique form name");
}

/**
 * Creates a new form for the default user and returns the persisted record.
 */
export async function POST(request: NextRequest) {
  return apiHandler(async () => {
    const body = await request.json();
    const parsed = CreateFormSchema.safeParse(body);

    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { title, theme, blocks, description, slug } = parsed.data;

    // Phase 1 single-user fallback.
    const user = await prisma.user.findFirst({
      orderBy: { id: "asc" },
      select: { id: true },
    });

    if (!user) {
      throw new InternalServerError("No user found. Run seed first.");
    }

    const baseTitle = title.trim() || "Untitled Form";
    const baseSlug = toSlug(slug?.trim() || baseTitle);
    const { title: uniqueTitle, slug: uniqueSlug } =
      await generateUniqueFormIdentity(baseTitle, baseSlug);

    // Create form with blocks.
    const form = await prisma.form.create({
      data: {
        title: uniqueTitle,
        theme,
        description: description ?? null,
        slug: uniqueSlug,
        userId: user.id,
        blocks: {
          create: blocks.map((block, idx) => ({
            type: block.type,
            name: block.name,
            props: block.props as Prisma.InputJsonValue,
            order: idx,
          })),
        },
      },
      include: {
        blocks: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  });
}
