import fs from "node:fs";
import path from "node:path";

export function publicImageExists(relPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", relPath));
}
