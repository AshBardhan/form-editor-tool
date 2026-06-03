import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { apiHandler } from "@/lib/utils/apiUtils";
import { NotFoundError, ValidationError } from "@/lib/errors";
import {
  CreateFormSchema,
  PatchFormStatusSchema,
} from "@/lib/schema/formSchema";

function toSlug(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "untitled-form";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Form ID is required" }, { status: 400 });
  }

  try {
    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        blocks: true,
      },
    });
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch form" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;
    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    const body = await request.json();
    const parsed = CreateFormSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { title, theme, blocks, description, slug } = parsed.data;

    // --- Check form exists ---
    const existing = await prisma.form.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError("Form not found");
    }

    const generatedSlug = toSlug(slug?.trim() || title);

    const duplicateForm = await prisma.form.findFirst({
      where: {
        slug: generatedSlug,
        NOT: { id },
      },
    });
    if (duplicateForm) {
      throw new ValidationError("Slug already exists");
    }

    // Replace the whole form payload in the same style as POST.
    const form = await prisma.form.update({
      where: { id },
      data: {
        title,
        theme,
        description: description ?? null,
        slug: generatedSlug,
        blocks: {
          deleteMany: {},
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;
    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    const existing = await prisma.form.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundError("Form not found");
    }

    await prisma.form.delete({ where: { id } });

    return NextResponse.json({ success: true, data: { id } }, { status: 200 });
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return apiHandler(async () => {
    const { id } = await params;
    if (!id) {
      throw new ValidationError("Form ID is required");
    }

    const body = await request.json();
    const parsed = PatchFormStatusSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { status } = parsed.data;

    const existing = await prisma.form.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!existing) {
      throw new NotFoundError("Form not found");
    }

    const form = await prisma.form.update({
      where: { id },
      data: {
        status,
        publishedAt:
          status === "published" && existing.status !== "published"
            ? new Date()
            : status === "draft"
              ? null
              : undefined,
      },
      include: {
        blocks: true,
      },
    });

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  });
}
