import { NextResponse } from "next/server";
import { ApiError } from "@/lib/errors";

export async function apiHandler(fn: () => Promise<NextResponse>) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: error.status },
      );
    }

    console.error(error);

    return NextResponse.json(
      { success: false, error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
