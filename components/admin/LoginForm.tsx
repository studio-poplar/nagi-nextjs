"use client";

import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? "ログインに失敗しました");
        setLoading(false);
        return;
      }
      window.location.reload();
    } catch (err) {
      setError(String(err));
      setLoading(false);
    }
  }

  return (
    <div className="admin-wrap" style={{ maxWidth: 380 }}>
      <header className="admin-header">
        <h1>凪 NAGI 管理画面</h1>
        <p>編集にはパスワードが必要です。</p>
      </header>
      <form className="admin-body" onSubmit={handleSubmit}>
        <label className="admin-field">
          <span className="admin-field-label">パスワード</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </label>
        <button type="submit" className="btn primary" disabled={loading || !password}>
          {loading ? "確認中…" : "ログイン"}
        </button>
        {error && <p className="admin-status admin-status--error">{error}</p>}
      </form>
    </div>
  );
}
