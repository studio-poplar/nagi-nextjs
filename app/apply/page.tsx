import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import { getSiteData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { applyPage } = getSiteData();
  return { title: applyPage.metaTitle, description: applyPage.metaDescription };
}

export default function ApplyPage() {
  const { applyPage, applySteps, plans } = getSiteData();

  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="eyebrow">{applyPage.intro.eyebrow}</span>
          <h1>{applyPage.intro.heading}</h1>
          <p className="lead">{applyPage.intro.lead}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">{applyPage.stepsSection.eyebrow}</span>
          <h2 className="section-title">{applyPage.stepsSection.heading}</h2>
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
          <span className="eyebrow">{applyPage.formSection.eyebrow}</span>
          <h2 className="section-title">{applyPage.formSection.heading}</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            {applyPage.formSection.lead}
          </p>
          <div data-reveal>
            <ApplyForm plans={plans} />
          </div>
        </div>
      </section>
    </>
  );
}
