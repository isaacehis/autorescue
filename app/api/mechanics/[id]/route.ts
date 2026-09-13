import { NextRequest, NextResponse } from "next/server";
import { mechanics } from "@/lib/data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const mechanic = mechanics.find((m) => m.id === parseInt(id));

    if (!mechanic) {
      return NextResponse.json({ success: false, error: "Mechanic not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: mechanic });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch mechanic" }, { status: 500 });
  }
}
