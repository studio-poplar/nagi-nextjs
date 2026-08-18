import type { Metadata } from "next";
import Button from "@/components/Button";
import PlanCard from "@/components/PlanCard";
import { plans, compareRows, faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "料金・プラン",
  description: "凪の月額プラン紹介。凪プラン・潮プラン・航プランの3種類から、暮らしのペースに合わせて選べます。",
};

export default function PricingPage() {
  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="eyebrow">MEMBERSHIP</span>
          <h1>料金・プラン</h1>
          <p className="lead">
            すべてのプランに、清掃費・光熱費・寝具一式・薪サウナの利用が含まれます。入会金は一律 ¥33,000（初月のみ）。休会・解約は翌月から可能です。
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="plan-grid" data-reveal>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} detailed />
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">COMPARE</span>
          <h2 className="section-title">プランをくらべる</h2>
          <div className="compare-table-wrap" data-reveal>
            <table className="compare-table">
              <thead>
                <tr>
                  <th></th>
                  {plans.map((plan) => (
                    <th key={plan.id} className={plan.featured ? "col-featured" : undefined}>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className={plans[i].featured ? "col-featured" : undefined}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--sand-deep)" }}>
        <div className="wrap" style={{ maxWidth: 840 }}>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title">よくある質問</h2>
          <div style={{ marginTop: 36 }} data-reveal>
            {faqs.map((faq) => (
              <details className="faq" key={faq.question} open={faq.open}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--sea-pale)" }}>
            JOIN NAGI
          </span>
          <h2>
            プランは、
            <br />
            あとから変更できます。
          </h2>
          <p className="lead">まずは凪プランから始めて、暮らしのペースが掴めたら潮プラン・航プランへ。面談で無理のない選び方をご提案します。</p>
          <div className="hero-actions">
            <Button href="/apply" variant="on-sand" arrow>
              入会案内を見る
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
