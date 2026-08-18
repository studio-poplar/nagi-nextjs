import type { Metadata } from "next";
import Button from "@/components/Button";
import Lines from "@/components/Lines";
import PlanCard from "@/components/PlanCard";
import { getSiteData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { pricingPage } = getSiteData();
  return { title: pricingPage.metaTitle, description: pricingPage.metaDescription };
}

export default function PricingPage() {
  const { pricingPage, plans, compareRows, faqs } = getSiteData();

  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="eyebrow">{pricingPage.intro.eyebrow}</span>
          <h1>{pricingPage.intro.heading}</h1>
          <p className="lead">{pricingPage.intro.lead}</p>
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
          <h2 className="section-title">{pricingPage.compareHeading}</h2>
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
          <h2 className="section-title">{pricingPage.faqHeading}</h2>
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
            {pricingPage.cta.eyebrow}
          </span>
          <h2>
            <Lines text={pricingPage.cta.heading} />
          </h2>
          <p className="lead">{pricingPage.cta.lead}</p>
          <div className="hero-actions">
            <Button href="/apply" variant="on-sand" arrow>
              {pricingPage.cta.primaryCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
