import type { Metadata } from "next";
import Scene from "@/components/Scene";
import WaveDivider from "@/components/WaveDivider";
import Button from "@/components/Button";
import Lines from "@/components/Lines";
import LocationCard from "@/components/LocationCard";
import PlanCard from "@/components/PlanCard";
import DayStep from "@/components/DayStep";
import VoiceCard from "@/components/VoiceCard";
import JournalCard from "@/components/JournalCard";
import { getImageBrightness, getSiteData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { home } = getSiteData();
  return { title: home.metaTitle, description: home.metaDescription };
}

export default function HomePage() {
  const { home, locations, plans, daySteps, voices, journalEntries } = getSiteData();

  return (
    <>
      {/* ============ HERO ============ */}
      <div className="hero">
        <Scene
          mood="dawn"
          fill
          sunPosition={{ top: "5%", left: "63%", size: 230 }}
          photo="/images/hero-uchibo-dawn.jpg"
          photoOverlay={home.hero.overlayOpacity}
          brightness={getImageBrightness("hero-uchibo-dawn.jpg")}
        />
        <div className="hero-inner wrap">
          <p className="hero-kicker">{home.hero.kicker}</p>
          <h1>{home.hero.heading}</h1>
          <p className="hero-copy">{home.hero.lead}</p>
          <div className="hero-actions">
            <Button href="/apply" variant="primary" arrow>
              {home.hero.primaryCta}
            </Button>
            <Button href="/locations" variant="on-dark">
              {home.hero.secondaryCta}
            </Button>
          </div>
        </div>
        <div className="hero-meta">
          <div>{home.hero.metaLine1}</div>
          <div>{home.hero.metaLine2}</div>
        </div>
      </div>

      {/* ============ CONCEPT ============ */}
      <section id="concept">
        <div className="wrap concept-grid">
          <div data-reveal>
            <span className="eyebrow">{home.concept.eyebrow}</span>
            <h2 className="section-title">
              <Lines text={home.concept.heading} />
            </h2>
            <p className="lead">{home.concept.paragraph1}</p>
            <p className="lead">{home.concept.paragraph2}</p>
          </div>
          <div data-reveal>
            <Scene
              mood="dawn"
              aspect="4 / 5"
              sunPosition={{ top: "10%", left: "60%", size: 120 }}
              className="concept-figure"
              photo="/images/concept-life.jpg"
              brightness={getImageBrightness("concept-life.jpg")}
            />
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--ink)" />

      {/* ============ LOCATIONS ============ */}
      <section style={{ background: "var(--ink)", color: "var(--sand)" }}>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow" style={{ color: "var(--sea-pale)" }}>
                {home.locationsSection.eyebrow}
              </span>
              <h2 className="section-title">
                <Lines text={home.locationsSection.heading} />
              </h2>
            </div>
            <p className="lead" style={{ color: "var(--sea-pale)" }}>
              {home.locationsSection.lead}
            </p>
          </div>

          <div className="rail-scroll" data-reveal>
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PLANS ============ */}
      <section>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">{home.plansSection.eyebrow}</span>
              <h2 className="section-title">
                <Lines text={home.plansSection.heading} />
              </h2>
            </div>
            <p className="lead">{home.plansSection.lead}</p>
          </div>

          <div className="plan-grid" data-reveal>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Button href="/pricing" arrow>
              {home.plansSection.cta}
            </Button>
          </p>
        </div>
      </section>

      {/* ============ DAY IN LIFE ============ */}
      <section style={{ background: "var(--sand-deep)" }}>
        <div className="wrap">
          <div data-reveal>
            <span className="eyebrow">{home.daySection.eyebrow}</span>
            <h2 className="section-title">{home.daySection.heading}</h2>
          </div>
          <div className="day-timeline" style={{ marginTop: 48 }} data-reveal>
            {daySteps.map((step) => (
              <DayStep key={step.time} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ VOICES ============ */}
      <section>
        <div className="wrap">
          <div data-reveal>
            <span className="eyebrow">{home.voicesSection.eyebrow}</span>
            <h2 className="section-title">{home.voicesSection.heading}</h2>
          </div>
          <div className="voice-grid" style={{ marginTop: 48 }} data-reveal>
            {voices.map((voice) => (
              <VoiceCard key={voice.who} voice={voice} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOURNAL PREVIEW ============ */}
      <section style={{ background: "var(--sand-deep)" }}>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">{home.journalSection.eyebrow}</span>
              <h2 className="section-title">{home.journalSection.heading}</h2>
            </div>
            <p className="lead">{home.journalSection.lead}</p>
          </div>
          <div className="journal-grid" data-reveal>
            {journalEntries.slice(0, 3).map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--sea-pale)" }}>
            {home.cta.eyebrow}
          </span>
          <h2>
            <Lines text={home.cta.heading} />
          </h2>
          <p className="lead">{home.cta.lead}</p>
          <div className="hero-actions">
            <Button href="/apply" variant="on-sand" arrow>
              {home.cta.primaryCta}
            </Button>
            <Button href="/locations" variant="on-dark">
              {home.cta.secondaryCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
