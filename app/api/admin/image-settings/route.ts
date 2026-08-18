import { NextResponse } from "next/server";
import { setImageSetting } from "@/lib/content";
import { isValidImageFilename } from "@/lib/images";

function isDev() {
  return process.env.NODE_ENV === "development";
}

export async function POST(request: Request) {
  if (!isDev()) return NextResponse.json({ error: "Not available in production" }, { status: 403 });

  const { filename, brightness } = (await request.json()) as { filename?: string; brightness?: number };

  if (typeof filename !== "string" || !isValidImageFilename(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }
  if (typeof brightness !== "number" || Number.isNaN(brightness) || brightness < 0 || brightness > 3) {
    return NextResponse.json({ error: "Invalid brightness" }, { status: 400 });
  }

  setImageSetting(filename, { brightness });
  return NextResponse.json({ ok: true });
}
