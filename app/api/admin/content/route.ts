import { NextResponse } from "next/server";
import { getSiteData, saveSiteData, type SiteData } from "@/lib/content";
import { isAuthenticated } from "@/lib/auth";
import { errorMessage } from "@/lib/errors";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getSiteData());
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = (await request.json()) as SiteData;
  try {
    await saveSiteData(data);
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
