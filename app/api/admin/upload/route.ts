import { NextResponse } from "next/server";
import { deleteUploadedImage, isValidImageFilename, saveUploadedImage } from "@/lib/images";

function isDev() {
  return process.env.NODE_ENV === "development";
}

export async function POST(request: Request) {
  if (!isDev()) return NextResponse.json({ error: "Not available in production" }, { status: 403 });

  const formData = await request.formData();
  const filename = formData.get("filename");
  const file = formData.get("file");

  if (typeof filename !== "string" || !isValidImageFilename(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Missing or invalid image file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  saveUploadedImage(filename, buffer);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isDev()) return NextResponse.json({ error: "Not available in production" }, { status: 403 });

  const { filename } = (await request.json()) as { filename?: string };
  if (typeof filename !== "string" || !isValidImageFilename(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  deleteUploadedImage(filename);
  return NextResponse.json({ ok: true });
}
