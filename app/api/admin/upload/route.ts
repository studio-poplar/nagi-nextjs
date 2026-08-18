import { NextResponse } from "next/server";
import { deleteUploadedImage, isValidImageFilename, saveUploadedImage } from "@/lib/images";
import { isAuthenticated } from "@/lib/auth";
import { errorMessage } from "@/lib/errors";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
  try {
    await saveUploadedImage(filename, buffer);
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { filename } = (await request.json()) as { filename?: string };
  if (typeof filename !== "string" || !isValidImageFilename(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  try {
    await deleteUploadedImage(filename);
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
