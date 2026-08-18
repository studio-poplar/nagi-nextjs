"use client";

import { useState, type ChangeEvent } from "react";
import type { ImageSlot } from "@/lib/images";
import { RangeField } from "./fields";
import { errorMessage } from "@/lib/errors";

interface SlotState extends ImageSlot {
  version: number;
  busy: boolean;
  error: string | null;
  /** Local object URL for the file just picked — shown instantly instead of the
   * real /images/ path, since a GitHub-committed image only actually becomes
   * servable once Vercel finishes redeploying (30–60s later). */
  previewUrl: string | null;
  /** True once a change has been committed but the page hasn't confirmed it's live yet. */
  pendingDeploy: boolean;
}

async function extractError(res: Response): Promise<string> {
  const body = (await res.json().catch(() => null)) as { error?: string } | null;
  return body?.error ?? (await res.text().catch(() => `HTTP ${res.status}`));
}

export default function ImageManager({ initialSlots }: { initialSlots: ImageSlot[] }) {
  const [slots, setSlots] = useState<SlotState[]>(
    initialSlots.map((s) => ({ ...s, version: 0, busy: false, error: null, previewUrl: null, pendingDeploy: false }))
  );

  function patchSlot(key: string, patch: Partial<SlotState>) {
    setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  }

  async function handleUpload(slot: SlotState, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
    const previewUrl = URL.createObjectURL(file);
    patchSlot(slot.key, { busy: true, error: null, previewUrl });

    try {
      const formData = new FormData();
      formData.append("filename", slot.filename);
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error(await extractError(res));
      patchSlot(slot.key, { busy: false, exists: true, pendingDeploy: true, version: slot.version + 1 });
    } catch (err) {
      patchSlot(slot.key, { busy: false, error: errorMessage(err), previewUrl: null });
    }
  }

  async function handleDelete(slot: SlotState) {
    patchSlot(slot.key, { busy: true, error: null });
    try {
      const res = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: slot.filename }),
      });
      if (!res.ok) throw new Error(await extractError(res));
      if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
      patchSlot(slot.key, {
        busy: false,
        exists: false,
        pendingDeploy: true,
        previewUrl: null,
        version: slot.version + 1,
      });
    } catch (err) {
      patchSlot(slot.key, { busy: false, error: errorMessage(err) });
    }
  }

  async function handleBrightnessCommit(slot: SlotState, brightness: number) {
    try {
      const res = await fetch("/api/admin/image-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: slot.filename, brightness }),
      });
      if (!res.ok) throw new Error(await extractError(res));
      patchSlot(slot.key, { pendingDeploy: true });
    } catch (err) {
      patchSlot(slot.key, { error: errorMessage(err) });
    }
  }

  return (
    <div className="admin-body">
      <p className="admin-field-hint">
        画像を選ぶとGitHubへ直接コミットされ、Vercelが自動で再デプロイします（反映まで30秒〜1分）。「削除」するとイラスト表示に戻ります。画像ごとに照度（明るさ）も調整できます。
      </p>
      <div className="admin-image-grid">
        {slots.map((slot) => (
          <div className="admin-image-card" key={slot.key}>
            <div className="admin-image-thumb">
              {slot.previewUrl || slot.exists ? (
                // eslint-disable-next-line @next/next/no-img-element -- admin-only preview, no need for next/image optimization
                <img
                  src={slot.previewUrl ?? `/images/${slot.filename}?v=${slot.version}`}
                  alt={slot.label}
                  style={{ filter: slot.brightness !== 1 ? `brightness(${slot.brightness})` : undefined }}
                />
              ) : (
                <span className="admin-image-placeholder">イラスト表示中</span>
              )}
            </div>
            <p className="admin-image-label">{slot.label}</p>
            <p className="admin-field-hint">
              {slot.filename}
              {slot.pendingDeploy && " ・ 反映待ち"}
            </p>
            <div className="admin-image-actions">
              <label className="btn admin-upload-btn">
                {slot.busy ? "処理中…" : slot.exists ? "差し替え" : "アップロード"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={slot.busy}
                  onChange={(e) => handleUpload(slot, e)}
                />
              </label>
              {slot.exists && (
                <button type="button" className="admin-remove-btn" disabled={slot.busy} onClick={() => handleDelete(slot)}>
                  削除
                </button>
              )}
            </div>
            {slot.exists && (
              <RangeField
                label="照度"
                value={slot.brightness}
                min={0.4}
                max={1.6}
                step={0.05}
                onChange={(v) => patchSlot(slot.key, { brightness: v })}
                onCommit={(v) => handleBrightnessCommit(slot, v)}
              />
            )}
            {slot.error && <p className="admin-status admin-status--error">{slot.error}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
