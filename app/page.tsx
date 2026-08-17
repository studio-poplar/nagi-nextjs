import type { Metadata } from "next";
import Scene from "@/components/Scene";
import WaveDivider from "@/components/WaveDivider";
import Button from "@/components/Button";
import LocationCard from "@/components/LocationCard";
import PlanCard from "@/components/PlanCard";
import DayStep from "@/components/DayStep";
import VoiceCard from "@/components/VoiceCard";
import JournalCard from "@/components/JournalCard";
import { locations, plans, daySteps, voices, journalEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "凪 NAGI ｜ サブスクリプション民宿",
  description:
    "凪(NAGI)は、全国の漁村に建つ宿を月額会費で泊まり歩ける会員制の住まいです。内房・能登・淡路・五島、四つの海を拠点に。",
};

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <div className="hero">
        <Scene mood="dawn" fill showBoat sunPosition={{ top: "5%", left: "63%", size: 230 }} />
        <div className="hero-inner wrap">
          <p className="hero-kicker">SUBSCRIPTION MINSHUKU — 定額制、会員制の宿</p>
          <h1>凪</h1>
          <p className="hero-copy">
            月々の会費で、全国の漁村に佇む宿を泊まり歩く。忙しさの合間に、潮の凪ぐ時間を暮らしへ差し込む、新しい第二の住まいです。
          </p>
          <div className="hero-actions">
            <Button href="/apply" variant="primary" arrow>
              入会案内を見る
            </Button>
            <Button href="/locations" variant="on-dark">
              四つの拠点を見る
            </Button>
          </div>
        </div>
        <div className="hero-meta">
          <div>四拠点 / UCHIBO・NOTO・AWAJI・GOTO</div>
          <div>本日の凪 — 内房 波高 0.3m</div>
        </div>
      </div>

      {/* ============ CONCEPT ============ */}
      <section id="concept">
        <div className="wrap concept-grid">
          <div data-reveal>
            <span className="eyebrow">THE CONCEPT</span>
            <h2 className="section-title">
              住むところを、
              <br />
              ひとつに決めない。
            </h2>
            <p className="lead">
              凪(なぎ)は、全国の漁村に建つ宿を、月額の会費で泊まり歩ける会員制の住まいです。空き家や納屋を改修した一棟一棟に、寝具や台所道具、薪と七輪までを備え、着いたその日から暮らせるようにしています。
            </p>
            <p className="lead">
              決まった一つの家に縛られず、潮の満ち引きや漁のカレンダーに合わせて拠点を移す。平日は都市で働き、週末は内房で干物を炙り、月に一度は能登の朝市に並ぶ。ふたつ以上の土地を行き来する暮らし方を、後押しします。
            </p>
          </div>
          <div data-reveal>
            <Scene mood="dawn" aspect="4 / 5" sunPosition={{ top: "10%", left: "60%", size: 120 }} className="concept-figure" />
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
                OUR BASES
              </span>
              <h2 className="section-title">
                四つの海、
                <br />
                四つの凪。
              </h2>
            </div>
            <p className="lead" style={{ color: "var(--sea-pale)" }}>
              東京湾の穏やかな内海から、日本海の荒々しい岩礁、瀬戸内の凪、そして東シナ海の透明な海まで。会員は月額プランの範囲内で、どの拠点も自由に選んで宿泊できます。
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
              <span className="eyebrow">MEMBERSHIP</span>
              <h2 className="section-title">
                暮らしの分だけ、
                <br />
                会費を選ぶ。
              </h2>
            </div>
            <p className="lead">
              どのプランも、清掃費・光熱費込みで四拠点すべてを利用可能。まずは月1泊のペースから、拠点を巡りながら働くペースまで。
            </p>
          </div>

          <div className="plan-grid" data-reveal>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Button href="/pricing" arrow>
              全プランの詳細を見る
            </Button>
          </p>
        </div>
      </section>

      {/* ============ DAY IN LIFE ============ */}
      <section style={{ background: "var(--sand-deep)" }}>
        <div className="wrap">
          <div data-reveal>
            <span className="eyebrow">A DAY AT NAGI</span>
            <h2 className="section-title">ある一日の、過ごし方。</h2>
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
            <span className="eyebrow">MEMBERS&apos; VOICE</span>
            <h2 className="section-title">会員の、声。</h2>
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
              <span className="eyebrow">JOURNAL</span>
              <h2 className="section-title">航海日誌</h2>
            </div>
            <p className="lead">四拠点の宿主や会員が綴る、季節と手仕事の記録。</p>
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
            JOIN NAGI
          </span>
          <h2>
            まずは一拠点から、
            <br />
            海のある暮らしを。
          </h2>
          <p className="lead">入会には簡単なオンライン面談があります。空き状況や拠点の選び方は、面談でゆっくりご相談ください。</p>
          <div className="hero-actions">
            <Button href="/apply" variant="on-sand" arrow>
              入会案内を見る
            </Button>
            <Button href="/locations" variant="on-dark">
              拠点をすべて見る
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
