import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
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
