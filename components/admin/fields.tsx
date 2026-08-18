"use client";

import type { ReactNode } from "react";

/** Immutably sets a value at a nested path inside a plain object/array tree. */
export function setDeep<T>(obj: T, path: (string | number)[], value: unknown): T {
  if (path.length === 0) return value as T;
  const [key, ...rest] = path;
  if (Array.isArray(obj)) {
    const arr = [...(obj as unknown[])];
    arr[key as number] = setDeep(arr[key as number], rest, value);
    return arr as unknown as T;
  }
  return { ...(obj as Record<string, unknown>), [key]: setDeep((obj as Record<string, unknown>)[key], rest, value) } as T;
}

export function Section({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details className="admin-section" open={defaultOpen}>
      <summary>{title}</summary>
      <div className="admin-section-body">{children}</div>
    </details>
  );
}

export function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="admin-field">
      <span className="admin-field-label">{label}</span>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="admin-field-hint">{hint}</span>}
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  hint,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <label className="admin-field">
      <span className="admin-field-label">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} />
      {hint && <span className="admin-field-hint">{hint}</span>}
    </label>
  );
}

/** Edits a string[] as one item per line — much simpler than per-item add/remove buttons. */
export function ListField({
  label,
  value,
  onChange,
  hint,
  rows = 4,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <TextAreaField
      label={label}
      value={value.join("\n")}
      onChange={(v) => onChange(v.split("\n"))}
      hint={hint ?? "1行につき1項目"}
      rows={rows}
    />
  );
}
