import fs from "node:fs";
import path from "node:path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const VALID_FILENAME = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/;

export function publicImageExists(relPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", relPath));
}

export function isValidImageFilename(filename: string): boolean {
  return VALID_FILENAME.test(filename);
}

export function saveUploadedImage(filename: string, buffer: Buffer): void {
  if (!isValidImageFilename(filename)) {
    throw new Error(`Invalid image filename: ${filename}`);
  }
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  fs.writeFileSync(path.join(IMAGES_DIR, filename), buffer);
}

export function deleteUploadedImage(filename: string): void {
  if (!isValidImageFilename(filename)) {
    throw new Error(`Invalid image filename: ${filename}`);
  }
  const target = path.join(IMAGES_DIR, filename);
  if (fs.existsSync(target)) fs.unlinkSync(target);
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
