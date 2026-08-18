import type { Metadata } from "next";
import Scene from "@/components/Scene";
import Button from "@/components/Button";
import Lines from "@/components/Lines";
import { getImageBrightness, getSiteData } from "@/lib/content";
import { photoTextStyle } from "@/lib/color";

export async function generateMetadata(): Promise<Metadata> {
  const { locationsPage } = getSiteData();
  return { title: locationsPage.metaTitle, description: locationsPage.metaDescription };
}

const details: { key: "access" | "capacity" | "facilities" | "season"; label: string }[] = [
  { key: "access", label: "ACCESS" },
  { key: "capacity", label: "定員" },
  { key: "facilities", label: "設備" },
  { key: "season", label: "おすすめの季節" },
];

export default function LocationsPage() {
  const { locationsPage, locations } = getSiteData();

  return (
    <>
      <div className="subhero">
        <Scene
          mood="dawn"
          fill
          sunPosition={{ top: "8%", left: "70%", size: 180 }}
          photo="/images/locations-subhero.jpg"
          photoOverlay={locationsPage.subhero.overlayOpacity}
          brightness={getImageBrightness("locations-subhero.jpg")}
        />
        <div className="subhero-inner wrap" style={photoTextStyle(locationsPage.subhero)}>
          <span className="eyebrow">{locationsPage.subhero.eyebrow}</span>
          <h1>
            <Lines text={locationsPage.subhero.heading} />
          </h1>
          <p>{locationsPage.subhero.lead}</p>
        </div>
      </div>

      {locations.map((location, index) => {
        // True left/right alternation per spec §6.2 — the static prototype's
        // order:1/2 values leave every section image-left despite alternating
        // background, so the figure/text order is swapped here instead.
        const flipped = index % 2 === 1;
        return (
          <section
            key={location.id}
            id={location.id}
            style={flipped ? { background: "var(--sand-deep)" } : undefined}
          >
            <div className="wrap concept-grid">
              <div data-reveal style={flipped ? { order: 2 } : undefined}>
                <Scene
                  mood={location.mood}
                  landmark={location.landmark}
                  sunPosition={location.sunPosition}
                  aspect="4 / 5"
                  className="concept-figure"
                  photo={`/images/location-${location.id}.jpg`}
                  brightness={getImageBrightness(`location-${location.id}.jpg`)}
                />
              </div>
              <div data-reveal style={flipped ? { order: 1 } : undefined}>
                <span className="eyebrow">
                  {location.order} ／ {location.region}
                </span>
                <h2 className="section-title">{location.name}</h2>
                <p className="lead">{location.description}</p>
                <ul className="stack-gap-lg" style={{ marginTop: 28, fontSize: "14.5px", color: "var(--ink-2)" }}>
                  {details.map((d) => (
                    <li key={d.key}>
                      <strong className="detail-label">{d.label}</strong>
                      <br />
                      {location[d.key]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--sea-pale)" }}>
            {locationsPage.cta.eyebrow}
          </span>
          <h2>
            <Lines text={locationsPage.cta.heading} />
          </h2>
          <p className="lead">{locationsPage.cta.lead}</p>
          <div className="hero-actions">
            <Button href="/pricing" variant="on-sand" arrow>
              {locationsPage.cta.primaryCta}
            </Button>
            <Button href="/apply" variant="on-dark">
              {locationsPage.cta.secondaryCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
