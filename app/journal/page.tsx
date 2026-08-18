import type { Metadata } from "next";
import Button from "@/components/Button";
import Lines from "@/components/Lines";
import JournalCard from "@/components/JournalCard";
import { getSiteData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { journalPage } = getSiteData();
  return { title: journalPage.metaTitle, description: journalPage.metaDescription };
}

export default function JournalPage() {
  const { journalPage, journalEntries } = getSiteData();

  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="eyebrow">{journalPage.intro.eyebrow}</span>
          <h1>{journalPage.intro.heading}</h1>
          <p className="lead">{journalPage.intro.lead}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="journal-grid" data-reveal>
            {journalEntries.map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--sea-pale)" }}>
            {journalPage.cta.eyebrow}
          </span>
          <h2>
            <Lines text={journalPage.cta.heading} />
          </h2>
          <p className="lead">{journalPage.cta.lead}</p>
          <div className="hero-actions">
            <Button href="/apply" variant="on-sand" arrow>
              {journalPage.cta.primaryCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
