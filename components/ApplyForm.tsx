"use client";

import { useState, type FormEvent } from "react";
import type { Plan } from "@/lib/content";

const locationChecks: { value: string; label: string }[] = [
  { value: "uchibo", label: "内房" },
  { value: "noto", label: "能登" },
  { value: "awaji", label: "淡路" },
  { value: "goto", label: "五島" },
];

export default function ApplyForm({ plans }: { plans: Plan[] }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="apply-form" style={{ marginTop: 40 }} onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">お名前</label>
        <input type="text" id="name" name="name" placeholder="例）泊 まなみ" required />
      </div>
      <div className="field">
        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required />
      </div>
      <div className="field">
        <label htmlFor="plan">ご希望のプラン</label>
        <select id="plan" name="plan">
          {plans.map((plan) => (
            <option key={plan.id}>
              {plan.name}（{plan.kana.split(" ／ ")[1]}・{plan.price}/月）
            </option>
          ))}
          <option>まだ決めていない・相談したい</option>
        </select>
      </div>
      <div className="field">
        <label>気になる拠点（複数選択可）</label>
        <div className="checks">
          {locationChecks.map((loc) => (
            <label key={loc.value}>
              <input type="checkbox" name="loc" value={loc.value} /> {loc.label}
            </label>
          ))}
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">一言メッセージ（任意）</label>
        <textarea id="message" name="message" placeholder="ご質問やご要望があればご記入ください" />
      </div>
      <div>
        <button type="submit" className="btn primary">
          面談を予約する <span className="arrow">→</span>
        </button>
        <p className="form-note" style={{ marginTop: 14 }}>
          送信後、ご入力いただいたメールアドレス宛に面談日程の候補をお送りします。
        </p>
      </div>
      <div className={`form-success${submitted ? " show" : ""}`} role="status">
        ご送信ありがとうございます。3営業日以内に、面談日程の候補をメールでご案内します。
      </div>
    </form>
  );
}
