import { NextResponse } from "next/server";
import { setImageSetting } from "@/lib/content";
import { isValidImageFilename } from "@/lib/images";
import { isAuthenticated } from "@/lib/auth";
import { errorMessage } from "@/lib/errors";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { filename, brightness } = (await request.json()) as { filename?: string; brightness?: number };

  if (typeof filename !== "string" || !isValidImageFilename(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }
  if (typeof brightness !== "number" || Number.isNaN(brightness) || brightness < 0 || brightness > 3) {
    return NextResponse.json({ error: "Invalid brightness" }, { status: 400 });
  }

  try {
    await setImageSetting(filename, { brightness });
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
