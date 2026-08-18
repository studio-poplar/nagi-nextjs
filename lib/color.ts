import type { CSSProperties } from "react";
import type { PhotoTextStyle } from "./content";

/** Converts a "#rrggbb" hex color + 0–1 alpha into an rgba() CSS string. */
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Inline style for the text wrapper of a hero/subhero — applies the admin-configured
 * text color and an optional solid panel behind the text, on top of a Scene photo. */
export function photoTextStyle(copy: PhotoTextStyle): CSSProperties {
  const hasBackground = !!copy.textBackgroundOpacity && copy.textBackgroundOpacity > 0;
  return {
    color: copy.textColor || undefined,
    background: hasBackground
      ? hexToRgba(copy.textBackgroundColor || "#1C2A33", copy.textBackgroundOpacity!)
      : undefined,
    paddingTop: hasBackground ? "32px" : undefined,
  };
}
