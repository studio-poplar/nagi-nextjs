"use client";

import { useState, type ChangeEvent } from "react";
import type { ImageSlot } from "@/lib/images";

interface SlotState extends ImageSlot {
  version: number;
  busy: boolean;
  error: string | null;
}

export default function ImageManager({ initialSlots }: { initialSlots: ImageSlot[] }) {
  const [slots, setSlots] = useState<SlotState[]>(
    initialSlots.map((s) => ({ ...s, version: 0, busy: false, error: null }))
  );

  function patchSlot(key: string, patch: Partial<SlotState>) {
    setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  }

  async function handleUpload(slot: SlotState, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    patchSlot(slot.key, { busy: true, error: null });
    try {
      const formData = new FormData();
      formData.append("filename", slot.filename);
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error(await res.text());
      patchSlot(slot.key, { busy: false, exists: true, version: slot.version + 1 });
    } catch (err) {
      patchSlot(slot.key, { busy: false, error: String(err) });
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
      if (!res.ok) throw new Error(await res.text());
      patchSlot(slot.key, { busy: false, exists: false, version: slot.version + 1 });
    } catch (err) {
      patchSlot(slot.key, { busy: false, error: String(err) });
    }
  }

  return (
    <div className="admin-body">
      <p className="admin-field-hint">
        画像を選ぶと自動的に <code>public/images/</code> に保存され、対応するセクションが即座にイラストから差し替わります（サイトのタブを再読み込みして確認してください）。「削除」するとイラスト表示に戻ります。
      </p>
      <div className="admin-image-grid">
        {slots.map((slot) => (
          <div className="admin-image-card" key={slot.key}>
            <div className="admin-image-thumb">
              {slot.exists ? (
                // eslint-disable-next-line @next/next/no-img-element -- admin-only local preview, no need for next/image optimization
                <img src={`/images/${slot.filename}?v=${slot.version}`} alt={slot.label} />
              ) : (
                <span className="admin-image-placeholder">イラスト表示中</span>
              )}
            </div>
            <p className="admin-image-label">{slot.label}</p>
            <p className="admin-field-hint">{slot.filename}</p>
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
            {slot.error && <p className="admin-status admin-status--error">{slot.error}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
