import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import { applySteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "入会案内",
  description: "凪への入会の流れと、お申し込みフォーム。",
};

export default function ApplyPage() {
  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="eyebrow">JOIN NAGI</span>
          <h1>入会案内</h1>
          <p className="lead">入会には簡単なオンライン面談があります。プランや拠点の選び方は、面談でゆっくりご相談いただけます。</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2 className="section-title">入会までの、4つのステップ。</h2>
          <div className="steps" style={{ marginTop: 32 }} data-reveal>
            {applySteps.map((step) => (
              <div className="step-row" key={step.number}>
                <span className="num">
                  {step.number} ／ {step.label}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--sand-deep)" }}>
        <div className="wrap">
          <span className="eyebrow">APPLICATION</span>
          <h2 className="section-title">お申し込みフォーム</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            まずは面談のご予約から。折り返しのご連絡までに3営業日ほどいただいております。
          </p>
          <div data-reveal>
            <ApplyForm />
          </div>
        </div>
      </section>
    </>
  );
}
