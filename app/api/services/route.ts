import { NextRequest, NextResponse } from "next/server";
import { services } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    let result = services;

    if (query) {
      const q = query.toLowerCase();
      result = services.filter(
        (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, data: result, total: result.length });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}