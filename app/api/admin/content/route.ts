import { NextResponse } from "next/server";
import { getSiteData, saveSiteData, type SiteData } from "@/lib/content";

function isDev() {
  return process.env.NODE_ENV === "development";
}

export async function GET() {
  if (!isDev()) return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  return NextResponse.json(getSiteData());
}

export async function POST(request: Request) {
  if (!isDev()) return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  const data = (await request.json()) as SiteData;
  saveSiteData(data);
  return NextResponse.json({ ok: true });
}
