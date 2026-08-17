import type { Metadata } from "next";
import Scene from "@/components/Scene";
import Button from "@/components/Button";
import { locations } from "@/lib/content";

export const metadata: Metadata = {
  title: "拠点",
  description: "凪の四拠点、内房・能登・淡路・五島の紹介。アクセスや設備、おすすめの季節をご案内します。",
};

const details: { key: "access" | "capacity" | "facilities" | "season"; label: string }[] = [
  { key: "access", label: "ACCESS" },
  { key: "capacity", label: "定員" },
  { key: "facilities", label: "設備" },
  { key: "season", label: "おすすめの季節" },
];

export default function LocationsPage() {
  return (
    <>
      <div className="subhero">
        <Scene mood="dawn" fill sunPosition={{ top: "8%", left: "70%", size: 180 }} />
        <div className="subhero-inner wrap">
          <span className="eyebrow">OUR BASES</span>
          <h1>
            四つの海、
            <br />
            四つの拠点。
          </h1>
          <p>東京湾・日本海・瀬戸内海・東シナ海。会員はどの拠点も、月額プランの範囲内で自由に選んで宿泊できます。</p>
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
                  showBoat={location.showBoat}
                  sunPosition={location.sunPosition}
                  aspect="4 / 5"
                  className="concept-figure"
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
            JOIN NAGI
          </span>
          <h2>
            四つの拠点、
            <br />
            どこから始めますか。
          </h2>
          <p className="lead">プランごとの利用可能日数や、拠点間の移動のコツは入会面談でご案内します。</p>
          <div className="hero-actions">
            <Button href="/pricing" variant="on-sand" arrow>
              料金・プランを見る
            </Button>
            <Button href="/apply" variant="on-dark">
              入会案内を見る
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
