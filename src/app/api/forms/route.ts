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

    // Auto-generate slug if not provided.
    const generatedSlug = toSlug(slug?.trim() || title);

    // Check for slug uniqueness.
    const existingForm = await prisma.form.findUnique({
      where: { slug: generatedSlug },
    });
    if (existingForm) {
      throw new ValidationError("Slug already exists");
    }

    // Create form with blocks.
    const form = await prisma.form.create({
      data: {
        title,
        theme,
        description: description ?? null,
        slug: generatedSlug,
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
