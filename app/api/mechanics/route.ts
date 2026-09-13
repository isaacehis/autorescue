import { NextRequest, NextResponse } from "next/server";
import { mechanics } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const service = searchParams.get("service");

    let result = mechanics;

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) => m.name.toLowerCase().includes(q) || m.location.toLowerCase().includes(q)
      );
    }

    if (service) {
      result = result.filter((m) =>
        m.services.some((s) => s.toLowerCase().includes(service.toLowerCase()))
      );
    }

    return NextResponse.json({ success: true, data: result, total: result.length });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch mechanics" }, { status: 500 });
  }
}