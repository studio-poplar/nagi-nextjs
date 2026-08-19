"use client";

import { useState, type FormEvent } from "react";
import { errorMessage } from "@/lib/errors";

export default function PasswordChangeForm() {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "新しいパスワード（確認）が一致しません" });
      return;
    }
    if (newPassword.length < 8) {
      setStatus({ type: "error", message: "新しいパスワードは8文字以上にしてください" });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "変更に失敗しました");
      setStatus({
        type: "ok",
        message: "変更をGitHubにコミットしました。反映（30秒〜1分）後、新しいパスワードでログインし直してください。",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setStatus({ type: "error", message: errorMessage(err) });
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className="admin-remove-btn" onClick={() => setOpen(true)}>
        パスワード変更
      </button>
    );
  }

  return (
    <form className="admin-item" onSubmit={handleSubmit} style={{ marginTop: 12 }}>
      <label className="admin-field">
        <span className="admin-field-label">現在のパスワード</span>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </label>
      <label className="admin-field">
        <span className="admin-field-label">新しいパスワード（8文字以上）</span>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>
      <label className="admin-field">
        <span className="admin-field-label">新しいパスワード（確認）</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>
      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "変更中…" : "パスワードを変更"}
        </button>
        <button type="button" className="admin-remove-btn" onClick={() => setOpen(false)} disabled={saving}>
          閉じる
        </button>
      </div>
      {status && <p className={`admin-status admin-status--${status.type}`}>{status.message}</p>}
    </form>
  );
}
