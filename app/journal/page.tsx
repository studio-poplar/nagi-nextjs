import type { Metadata } from "next";
import Button from "@/components/Button";
import JournalCard from "@/components/JournalCard";
import { journalEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "航海日誌",
  description: "凪の四拠点の宿主や会員が綴る、舟屋の改修と静けさの記録。",
};

export default function JournalPage() {
  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="eyebrow">JOURNAL</span>
          <h1>航海日誌</h1>
          <p className="lead">四拠点の宿主や会員が綴る、舟屋の改修と静けさの記録。潮の匂いのする日々の断片です。</p>
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
            JOIN NAGI
          </span>
          <h2>
            次の日誌を、
            <br />
            自分の手で書く。
          </h2>
          <p className="lead">入会すると、滞在の記録を会員限定の日誌に残せます。</p>
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
