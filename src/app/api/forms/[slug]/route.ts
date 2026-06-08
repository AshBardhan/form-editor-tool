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

async function resolveFormIdBySlug(slug: string): Promise<string> {
  const form = await prisma.form.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!form) {
    throw new NotFoundError("Form not found");
  }

  return form.id;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return apiHandler(async () => {
    const { slug } = await params;
    if (!slug) {
      throw new ValidationError("Form slug is required");
    }

    const form = await prisma.form.findUnique({
      where: { slug },
      include: {
        blocks: true,
      },
    });

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return apiHandler(async () => {
    const { slug } = await params;
    if (!slug) {
      throw new ValidationError("Form slug is required");
    }

    const id = await resolveFormIdBySlug(slug);

    const body = await request.json();
    const parsed = CreateFormSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(
        parsed.error.issues[0]?.message || "Invalid request body",
      );
    }

    const { title, theme, blocks, description, slug: inputSlug } = parsed.data;

    const generatedSlug = toSlug(inputSlug?.trim() || title);

    const duplicateForm = await prisma.form.findFirst({
      where: {
        slug: generatedSlug,
        NOT: { id },
      },
    });
    if (duplicateForm) {
      throw new ValidationError("Slug already exists");
    }

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
  { params }: { params: Promise<{ slug: string }> },
) {
  return apiHandler(async () => {
    const { slug } = await params;
    if (!slug) {
      throw new ValidationError("Form slug is required");
    }

    const id = await resolveFormIdBySlug(slug);

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
  { params }: { params: Promise<{ slug: string }> },
) {
  return apiHandler(async () => {
    const { slug } = await params;
    if (!slug) {
      throw new ValidationError("Form slug is required");
    }

    const id = await resolveFormIdBySlug(slug);

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
