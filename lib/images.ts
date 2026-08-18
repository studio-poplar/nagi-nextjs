import fs from "node:fs";
import path from "node:path";
import { deleteFile, putFile } from "./github";

const VALID_FILENAME = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/;

export function publicImageExists(relPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", relPath));
}

export function isValidImageFilename(filename: string): boolean {
  return VALID_FILENAME.test(filename);
}

/** Commits the image straight to GitHub (Vercel's production filesystem is
 * read-only) — the commit triggers Vercel's auto-redeploy. */
export async function saveUploadedImage(filename: string, buffer: Buffer): Promise<void> {
  if (!isValidImageFilename(filename)) {
    throw new Error(`Invalid image filename: ${filename}`);
  }
  await putFile(`public/images/${filename}`, buffer, `content: upload ${filename} via admin panel`);
}

export async function deleteUploadedImage(filename: string): Promise<void> {
  if (!isValidImageFilename(filename)) {
    throw new Error(`Invalid image filename: ${filename}`);
  }
  await deleteFile(`public/images/${filename}`, `content: remove ${filename} via admin panel`);
}

export interface ImageSlot {
  key: string;
  label: string;
  filename: string;
  exists: boolean;
  brightness: number;
}

/** Derives the full list of image slots the site actually uses, so it always
 * matches current locations/journal entries without needing to be kept in sync
 * by hand. */
export function getImageSlots(siteData: {
  locations: { id: string; name: string }[];
  journalEntries: { slug: string; title: string }[];
  imageSettings: Record<string, { brightness?: number }>;
}): ImageSlot[] {
  const slots: { key: string; label: string; filename: string }[] = [
    { key: "hero", label: "トップページ ヒーロー", filename: "hero-uchibo-dawn.jpg" },
    { key: "concept", label: "トップページ コンセプト", filename: "concept-life.jpg" },
    { key: "locations-subhero", label: "拠点ページ サブヒーロー", filename: "locations-subhero.jpg" },
    ...siteData.locations.map((l) => ({
      key: `location-${l.id}`,
      label: `拠点：${l.name}`,
      filename: `location-${l.id}.jpg`,
    })),
    ...siteData.journalEntries.map((entry) => ({
      key: `journal-${entry.slug}`,
      label: `航海日誌：${entry.title}`,
      filename: `journal-${entry.slug}.jpg`,
    })),
  ];

  return slots.map((s) => ({
    ...s,
    exists: publicImageExists(`images/${s.filename}`),
    brightness: siteData.imageSettings?.[s.filename]?.brightness ?? 1,
  }));
}
