"use client";

import { useState } from "react";
import type { SiteData } from "@/lib/content";
import type { ImageSlot } from "@/lib/images";
import { ColorField, Field, ListField, RangeField, Section, TextAreaField, setDeep } from "./fields";
import ImageManager from "./ImageManager";

interface Props {
  initialData: SiteData;
  initialSlots: ImageSlot[];
}

const MOOD_OPTIONS: { value: string; label: string }[] = [
  { value: "dawn", label: "暁（明け方）" },
  { value: "dusk", label: "夕（夕暮れ）" },
  { value: "overcast", label: "曇天" },
  { value: "noon", label: "昼（快晴）" },
];

export default function AdminClient({ initialData, initialSlots }: Props) {
  const [data, setData] = useState<SiteData>(initialData);
  const [tab, setTab] = useState<"text" | "images">("text");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);

  function set(path: (string | number)[], value: unknown) {
    setData((d) => setDeep(d, path, value));
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus({ type: "ok", message: "保存しました。サイトのタブを再読み込みすると反映されます。" });
    } catch (e) {
      setStatus({ type: "error", message: `保存に失敗しました：${String(e)}` });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <h1>凪 NAGI 管理画面</h1>
        <p>
          ローカル編集専用です。保存すると <code>content/site.json</code> に書き込まれます。GitHub
          Desktopでいつも通り commit / push すると本番（Vercel）に反映されます。
        </p>
        <div className="admin-tabs">
          <button type="button" className={tab === "text" ? "active" : ""} onClick={() => setTab("text")}>
            文言編集
          </button>
          <button type="button" className={tab === "images" ? "active" : ""} onClick={() => setTab("images")}>
            画像管理
          </button>
        </div>
      </header>

      {tab === "text" && (
        <div className="admin-body">
          <Section title="サイト全体">
            <Field label="サイトタイトル（既定）" value={data.site.titleDefault} onChange={(v) => set(["site", "titleDefault"], v)} />
            <Field
              label="タイトルテンプレート"
              value={data.site.titleTemplate}
              onChange={(v) => set(["site", "titleTemplate"], v)}
              hint="%s の部分が各ページのタイトルに置き換わります"
            />
            <TextAreaField label="サイト説明文（SEO用）" value={data.site.description} onChange={(v) => set(["site", "description"], v)} rows={2} />
          </Section>

          <Section title="フッター">
            <TextAreaField label="タグライン" value={data.footer.tagline} onChange={(v) => set(["footer", "tagline"], v)} rows={2} />
            <Field label="コピーライト表記" value={data.footer.copyright} onChange={(v) => set(["footer", "copyright"], v)} />
            <Field label="注記（架空案件の断り書き）" value={data.footer.disclaimer} onChange={(v) => set(["footer", "disclaimer"], v)} />
          </Section>

          <Section title="トップページ" defaultOpen>
            <Field label="ページタイトル（SEO用）" value={data.home.metaTitle} onChange={(v) => set(["home", "metaTitle"], v)} />
            <TextAreaField label="ページ説明文（SEO用）" value={data.home.metaDescription} onChange={(v) => set(["home", "metaDescription"], v)} rows={2} />

            <h3 className="admin-subhead">ヒーロー</h3>
            <Field label="キッカー（英語コピー）" value={data.home.hero.kicker} onChange={(v) => set(["home", "hero", "kicker"], v)} />
            <Field label="見出し（通常「凪」）" value={data.home.hero.heading} onChange={(v) => set(["home", "hero", "heading"], v)} />
            <TextAreaField label="リード文" value={data.home.hero.lead} onChange={(v) => set(["home", "hero", "lead"], v)} rows={3} />
            <Field label="メインCTAボタン文言" value={data.home.hero.primaryCta} onChange={(v) => set(["home", "hero", "primaryCta"], v)} />
            <Field label="サブCTAボタン文言" value={data.home.hero.secondaryCta} onChange={(v) => set(["home", "hero", "secondaryCta"], v)} />
            <Field label="右下メタ情報 1行目" value={data.home.hero.metaLine1} onChange={(v) => set(["home", "hero", "metaLine1"], v)} />
            <Field label="右下メタ情報 2行目" value={data.home.hero.metaLine2} onChange={(v) => set(["home", "hero", "metaLine2"], v)} />
            <RangeField
              label="画像を暗くする強さ"
              value={data.home.hero.overlayOpacity ?? 0.35}
              onChange={(v) => set(["home", "hero", "overlayOpacity"], v)}
              hint="ヒーロー画像全体にかける暗さ。文字が見えにくい場合はここを上げてください（イラスト表示中は影響しません）"
            />
            <ColorField
              label="文字色"
              value={data.home.hero.textColor ?? ""}
              onChange={(v) => set(["home", "hero", "textColor"], v)}
              fallback="#FBF8F1"
              hint="未設定はブランド既定色（生成り）"
            />
            <ColorField
              label="文字背景の色"
              value={data.home.hero.textBackgroundColor ?? ""}
              onChange={(v) => set(["home", "hero", "textBackgroundColor"], v)}
              fallback="#1C2A33"
            />
            <RangeField
              label="文字背景の濃さ"
              value={data.home.hero.textBackgroundOpacity ?? 0}
              onChange={(v) => set(["home", "hero", "textBackgroundOpacity"], v)}
              hint="0%はパネル非表示。文字の後ろに帯を敷いて可読性を上げたい場合に上げてください"
            />

            <h3 className="admin-subhead">コンセプト</h3>
            <Field label="見出し上のラベル" value={data.home.concept.eyebrow} onChange={(v) => set(["home", "concept", "eyebrow"], v)} />
            <TextAreaField
              label="見出し"
              value={data.home.concept.heading}
              onChange={(v) => set(["home", "concept", "heading"], v)}
              hint="改行を入れると2行見出しになります"
              rows={2}
            />
            <TextAreaField label="本文1段落目" value={data.home.concept.paragraph1} onChange={(v) => set(["home", "concept", "paragraph1"], v)} rows={3} />
            <TextAreaField label="本文2段落目" value={data.home.concept.paragraph2} onChange={(v) => set(["home", "concept", "paragraph2"], v)} rows={3} />

            <h3 className="admin-subhead">拠点セクション</h3>
            <Field label="ラベル" value={data.home.locationsSection.eyebrow} onChange={(v) => set(["home", "locationsSection", "eyebrow"], v)} />
            <TextAreaField
              label="見出し"
              value={data.home.locationsSection.heading}
              onChange={(v) => set(["home", "locationsSection", "heading"], v)}
              hint="改行を入れると2行見出しになります"
              rows={2}
            />
            <TextAreaField label="リード文" value={data.home.locationsSection.lead ?? ""} onChange={(v) => set(["home", "locationsSection", "lead"], v)} rows={2} />

            <h3 className="admin-subhead">プランセクション</h3>
            <Field label="ラベル" value={data.home.plansSection.eyebrow} onChange={(v) => set(["home", "plansSection", "eyebrow"], v)} />
            <TextAreaField
              label="見出し"
              value={data.home.plansSection.heading}
              onChange={(v) => set(["home", "plansSection", "heading"], v)}
              hint="改行を入れると2行見出しになります"
              rows={2}
            />
            <TextAreaField label="リード文" value={data.home.plansSection.lead ?? ""} onChange={(v) => set(["home", "plansSection", "lead"], v)} rows={2} />
            <Field label="ボタン文言" value={data.home.plansSection.cta} onChange={(v) => set(["home", "plansSection", "cta"], v)} />

            <h3 className="admin-subhead">ある一日の過ごし方 セクション</h3>
            <Field label="ラベル" value={data.home.daySection.eyebrow} onChange={(v) => set(["home", "daySection", "eyebrow"], v)} />
            <Field label="見出し" value={data.home.daySection.heading} onChange={(v) => set(["home", "daySection", "heading"], v)} />

            <h3 className="admin-subhead">会員の声 セクション</h3>
            <Field label="ラベル" value={data.home.voicesSection.eyebrow} onChange={(v) => set(["home", "voicesSection", "eyebrow"], v)} />
            <Field label="見出し" value={data.home.voicesSection.heading} onChange={(v) => set(["home", "voicesSection", "heading"], v)} />

            <h3 className="admin-subhead">航海日誌プレビュー セクション</h3>
            <Field label="ラベル" value={data.home.journalSection.eyebrow} onChange={(v) => set(["home", "journalSection", "eyebrow"], v)} />
            <Field label="見出し" value={data.home.journalSection.heading} onChange={(v) => set(["home", "journalSection", "heading"], v)} />
            <TextAreaField label="リード文" value={data.home.journalSection.lead ?? ""} onChange={(v) => set(["home", "journalSection", "lead"], v)} rows={2} />

            <h3 className="admin-subhead">CTAバンド</h3>
            <Field label="ラベル" value={data.home.cta.eyebrow} onChange={(v) => set(["home", "cta", "eyebrow"], v)} />
            <TextAreaField label="見出し" value={data.home.cta.heading} onChange={(v) => set(["home", "cta", "heading"], v)} hint="改行を入れると2行見出しになります" rows={2} />
            <TextAreaField label="リード文" value={data.home.cta.lead} onChange={(v) => set(["home", "cta", "lead"], v)} rows={2} />
            <Field label="メインCTAボタン文言" value={data.home.cta.primaryCta ?? ""} onChange={(v) => set(["home", "cta", "primaryCta"], v)} />
            <Field label="サブCTAボタン文言" value={data.home.cta.secondaryCta ?? ""} onChange={(v) => set(["home", "cta", "secondaryCta"], v)} />
          </Section>

          <Section title="拠点ページ">
            <Field label="ページタイトル（SEO用）" value={data.locationsPage.metaTitle} onChange={(v) => set(["locationsPage", "metaTitle"], v)} />
            <TextAreaField label="ページ説明文（SEO用）" value={data.locationsPage.metaDescription} onChange={(v) => set(["locationsPage", "metaDescription"], v)} rows={2} />
            <h3 className="admin-subhead">サブヒーロー</h3>
            <Field label="ラベル" value={data.locationsPage.subhero.eyebrow} onChange={(v) => set(["locationsPage", "subhero", "eyebrow"], v)} />
            <TextAreaField label="見出し" value={data.locationsPage.subhero.heading} onChange={(v) => set(["locationsPage", "subhero", "heading"], v)} hint="改行を入れると2行見出しになります" rows={2} />
            <TextAreaField label="リード文" value={data.locationsPage.subhero.lead ?? ""} onChange={(v) => set(["locationsPage", "subhero", "lead"], v)} rows={2} />
            <RangeField
              label="画像を暗くする強さ"
              value={data.locationsPage.subhero.overlayOpacity ?? 0.35}
              onChange={(v) => set(["locationsPage", "subhero", "overlayOpacity"], v)}
              hint="サブヒーロー画像全体にかける暗さ。文字が見えにくい場合はここを上げてください（イラスト表示中は影響しません）"
            />
            <ColorField
              label="文字色"
              value={data.locationsPage.subhero.textColor ?? ""}
              onChange={(v) => set(["locationsPage", "subhero", "textColor"], v)}
              fallback="#FBF8F1"
              hint="未設定はブランド既定色（生成り）"
            />
            <ColorField
              label="文字背景の色"
              value={data.locationsPage.subhero.textBackgroundColor ?? ""}
              onChange={(v) => set(["locationsPage", "subhero", "textBackgroundColor"], v)}
              fallback="#1C2A33"
            />
            <RangeField
              label="文字背景の濃さ"
              value={data.locationsPage.subhero.textBackgroundOpacity ?? 0}
              onChange={(v) => set(["locationsPage", "subhero", "textBackgroundOpacity"], v)}
              hint="0%はパネル非表示。文字の後ろに帯を敷いて可読性を上げたい場合に上げてください"
            />
            <h3 className="admin-subhead">CTAバンド</h3>
            <Field label="ラベル" value={data.locationsPage.cta.eyebrow} onChange={(v) => set(["locationsPage", "cta", "eyebrow"], v)} />
            <TextAreaField label="見出し" value={data.locationsPage.cta.heading} onChange={(v) => set(["locationsPage", "cta", "heading"], v)} hint="改行を入れると2行見出しになります" rows={2} />
            <TextAreaField label="リード文" value={data.locationsPage.cta.lead} onChange={(v) => set(["locationsPage", "cta", "lead"], v)} rows={2} />
            <Field label="メインCTAボタン文言" value={data.locationsPage.cta.primaryCta ?? ""} onChange={(v) => set(["locationsPage", "cta", "primaryCta"], v)} />
            <Field label="サブCTAボタン文言" value={data.locationsPage.cta.secondaryCta ?? ""} onChange={(v) => set(["locationsPage", "cta", "secondaryCta"], v)} />
          </Section>

          <Section title="料金ページ">
            <Field label="ページタイトル（SEO用）" value={data.pricingPage.metaTitle} onChange={(v) => set(["pricingPage", "metaTitle"], v)} />
            <TextAreaField label="ページ説明文（SEO用）" value={data.pricingPage.metaDescription} onChange={(v) => set(["pricingPage", "metaDescription"], v)} rows={2} />
            <h3 className="admin-subhead">導入部</h3>
            <Field label="ラベル" value={data.pricingPage.intro.eyebrow} onChange={(v) => set(["pricingPage", "intro", "eyebrow"], v)} />
            <Field label="見出し（h1）" value={data.pricingPage.intro.heading} onChange={(v) => set(["pricingPage", "intro", "heading"], v)} />
            <TextAreaField label="リード文" value={data.pricingPage.intro.lead ?? ""} onChange={(v) => set(["pricingPage", "intro", "lead"], v)} rows={2} />
            <Field label="比較表 見出し" value={data.pricingPage.compareHeading} onChange={(v) => set(["pricingPage", "compareHeading"], v)} />
            <Field label="FAQ 見出し" value={data.pricingPage.faqHeading} onChange={(v) => set(["pricingPage", "faqHeading"], v)} />
            <h3 className="admin-subhead">CTAバンド</h3>
            <Field label="ラベル" value={data.pricingPage.cta.eyebrow} onChange={(v) => set(["pricingPage", "cta", "eyebrow"], v)} />
            <TextAreaField label="見出し" value={data.pricingPage.cta.heading} onChange={(v) => set(["pricingPage", "cta", "heading"], v)} hint="改行を入れると2行見出しになります" rows={2} />
            <TextAreaField label="リード文" value={data.pricingPage.cta.lead} onChange={(v) => set(["pricingPage", "cta", "lead"], v)} rows={2} />
            <Field label="CTAボタン文言" value={data.pricingPage.cta.primaryCta ?? ""} onChange={(v) => set(["pricingPage", "cta", "primaryCta"], v)} />
          </Section>

          <Section title="航海日誌ページ">
            <Field label="ページタイトル（SEO用）" value={data.journalPage.metaTitle} onChange={(v) => set(["journalPage", "metaTitle"], v)} />
            <TextAreaField label="ページ説明文（SEO用）" value={data.journalPage.metaDescription} onChange={(v) => set(["journalPage", "metaDescription"], v)} rows={2} />
            <h3 className="admin-subhead">導入部</h3>
            <Field label="ラベル" value={data.journalPage.intro.eyebrow} onChange={(v) => set(["journalPage", "intro", "eyebrow"], v)} />
            <Field label="見出し（h1）" value={data.journalPage.intro.heading} onChange={(v) => set(["journalPage", "intro", "heading"], v)} />
            <TextAreaField label="リード文" value={data.journalPage.intro.lead ?? ""} onChange={(v) => set(["journalPage", "intro", "lead"], v)} rows={2} />
            <h3 className="admin-subhead">CTAバンド</h3>
            <Field label="ラベル" value={data.journalPage.cta.eyebrow} onChange={(v) => set(["journalPage", "cta", "eyebrow"], v)} />
            <TextAreaField label="見出し" value={data.journalPage.cta.heading} onChange={(v) => set(["journalPage", "cta", "heading"], v)} hint="改行を入れると2行見出しになります" rows={2} />
            <TextAreaField label="リード文" value={data.journalPage.cta.lead} onChange={(v) => set(["journalPage", "cta", "lead"], v)} rows={2} />
            <Field label="CTAボタン文言" value={data.journalPage.cta.primaryCta ?? ""} onChange={(v) => set(["journalPage", "cta", "primaryCta"], v)} />
          </Section>

          <Section title="入会案内ページ">
            <Field label="ページタイトル（SEO用）" value={data.applyPage.metaTitle} onChange={(v) => set(["applyPage", "metaTitle"], v)} />
            <TextAreaField label="ページ説明文（SEO用）" value={data.applyPage.metaDescription} onChange={(v) => set(["applyPage", "metaDescription"], v)} rows={2} />
            <h3 className="admin-subhead">導入部</h3>
            <Field label="ラベル" value={data.applyPage.intro.eyebrow} onChange={(v) => set(["applyPage", "intro", "eyebrow"], v)} />
            <Field label="見出し（h1）" value={data.applyPage.intro.heading} onChange={(v) => set(["applyPage", "intro", "heading"], v)} />
            <TextAreaField label="リード文" value={data.applyPage.intro.lead ?? ""} onChange={(v) => set(["applyPage", "intro", "lead"], v)} rows={2} />
            <h3 className="admin-subhead">ステップセクション</h3>
            <Field label="ラベル" value={data.applyPage.stepsSection.eyebrow} onChange={(v) => set(["applyPage", "stepsSection", "eyebrow"], v)} />
            <Field label="見出し" value={data.applyPage.stepsSection.heading} onChange={(v) => set(["applyPage", "stepsSection", "heading"], v)} />
            <h3 className="admin-subhead">フォームセクション</h3>
            <Field label="ラベル" value={data.applyPage.formSection.eyebrow} onChange={(v) => set(["applyPage", "formSection", "eyebrow"], v)} />
            <Field label="見出し" value={data.applyPage.formSection.heading} onChange={(v) => set(["applyPage", "formSection", "heading"], v)} />
            <TextAreaField label="リード文" value={data.applyPage.formSection.lead ?? ""} onChange={(v) => set(["applyPage", "formSection", "lead"], v)} rows={2} />
          </Section>

          <Section title="拠点データ（4拠点）">
            {data.locations.map((loc, i) => (
              <div className="admin-item" key={loc.id}>
                <h3 className="admin-subhead">
                  {loc.order} ／ {loc.name}
                </h3>
                <Field label="エリア表記" value={loc.region} onChange={(v) => set(["locations", i, "region"], v)} />
                <Field label="拠点名" value={loc.name} onChange={(v) => set(["locations", i, "name"], v)} />
                <TextAreaField label="紹介文" value={loc.description} onChange={(v) => set(["locations", i, "description"], v)} rows={3} />
                <ListField label="タグ" value={loc.tags} onChange={(v) => set(["locations", i, "tags"], v)} />
                <Field label="ACCESS" value={loc.access} onChange={(v) => set(["locations", i, "access"], v)} />
                <Field label="定員" value={loc.capacity} onChange={(v) => set(["locations", i, "capacity"], v)} />
                <Field label="設備" value={loc.facilities} onChange={(v) => set(["locations", i, "facilities"], v)} />
                <Field label="おすすめの季節" value={loc.season} onChange={(v) => set(["locations", i, "season"], v)} />
              </div>
            ))}
          </Section>

          <Section title="プランデータ（3プラン）">
            {data.plans.map((plan, i) => (
              <div className="admin-item" key={plan.id}>
                <h3 className="admin-subhead">{plan.name}</h3>
                <Field label="プラン名" value={plan.name} onChange={(v) => set(["plans", i, "name"], v)} />
                <Field label="かな表記／泊数目安" value={plan.kana} onChange={(v) => set(["plans", i, "kana"], v)} hint="例）NAGI ／ 月1泊から" />
                <Field label="月額料金" value={plan.price} onChange={(v) => set(["plans", i, "price"], v)} hint="例）¥58,000" />
                <Field label="一言説明" value={plan.desc} onChange={(v) => set(["plans", i, "desc"], v)} />
                <ListField label="特徴（トップページ用・短め）" value={plan.features} onChange={(v) => set(["plans", i, "features"], v)} />
                <ListField label="特徴（料金ページ用・詳細）" value={plan.featuresDetail} onChange={(v) => set(["plans", i, "featuresDetail"], v)} />
                <label className="admin-checkbox">
                  <input type="checkbox" checked={!!plan.featured} onChange={(e) => set(["plans", i, "featured"], e.target.checked)} />
                  おすすめプランとして強調表示する
                </label>
              </div>
            ))}
          </Section>

          <Section title="料金比較表（7行）">
            {data.compareRows.map((row, i) => (
              <div className="admin-item" key={i}>
                <Field label="項目名" value={row.label} onChange={(v) => set(["compareRows", i, "label"], v)} />
                <div className="admin-row-3">
                  <Field label={data.plans[0]?.name ?? "プラン1"} value={row.values[0]} onChange={(v) => set(["compareRows", i, "values", 0], v)} />
                  <Field label={data.plans[1]?.name ?? "プラン2"} value={row.values[1]} onChange={(v) => set(["compareRows", i, "values", 1], v)} />
                  <Field label={data.plans[2]?.name ?? "プラン3"} value={row.values[2]} onChange={(v) => set(["compareRows", i, "values", 2], v)} />
                </div>
              </div>
            ))}
          </Section>

          <Section title="よくある質問（FAQ）">
            {data.faqs.map((faq, i) => (
              <div className="admin-item" key={i}>
                <Field label="質問" value={faq.question} onChange={(v) => set(["faqs", i, "question"], v)} />
                <TextAreaField label="回答" value={faq.answer} onChange={(v) => set(["faqs", i, "answer"], v)} rows={2} />
                <label className="admin-checkbox">
                  <input type="checkbox" checked={!!faq.open} onChange={(e) => set(["faqs", i, "open"], e.target.checked)} />
                  初期状態で開いておく
                </label>
                <button
                  type="button"
                  className="admin-remove-btn"
                  onClick={() => setData((d) => ({ ...d, faqs: d.faqs.filter((_, j) => j !== i) }))}
                >
                  この質問を削除
                </button>
              </div>
            ))}
            <button
              type="button"
              className="admin-add-btn"
              onClick={() =>
                setData((d) => ({ ...d, faqs: [...d.faqs, { question: "", answer: "", open: false }] }))
              }
            >
              ＋ 質問を追加
            </button>
          </Section>

          <Section title="ある一日の過ごし方（4ステップ）">
            {data.daySteps.map((step, i) => (
              <div className="admin-item" key={i}>
                <Field label="時刻" value={step.time} onChange={(v) => set(["daySteps", i, "time"], v)} />
                <Field label="小見出し" value={step.title} onChange={(v) => set(["daySteps", i, "title"], v)} />
                <TextAreaField label="説明文" value={step.description} onChange={(v) => set(["daySteps", i, "description"], v)} rows={2} />
              </div>
            ))}
          </Section>

          <Section title="会員の声（3件）">
            {data.voices.map((voice, i) => (
              <div className="admin-item" key={i}>
                <TextAreaField label="コメント" value={voice.quote} onChange={(v) => set(["voices", i, "quote"], v)} rows={3} />
                <Field label="属性表記" value={voice.who} onChange={(v) => set(["voices", i, "who"], v)} hint="例）潮プラン会員 ／ 経営者" />
              </div>
            ))}
          </Section>

          <Section title="航海日誌 記事一覧">
            {data.journalEntries.map((entry, i) => (
              <div className="admin-item" key={i}>
                <Field
                  label="スラッグ（画像ファイル名にも使われます）"
                  value={entry.slug}
                  onChange={(v) => set(["journalEntries", i, "slug"], v)}
                  hint={`画像は public/images/journal-${entry.slug || "..."}.jpg`}
                />
                <Field label="日付" value={entry.date} onChange={(v) => set(["journalEntries", i, "date"], v)} hint="例）2026.02.14" />
                <Field label="タイトル" value={entry.title} onChange={(v) => set(["journalEntries", i, "title"], v)} />
                <Field label="拠点名" value={entry.location} onChange={(v) => set(["journalEntries", i, "location"], v)} />
                <label className="admin-field">
                  <span className="admin-field-label">雰囲気（Sceneイラストのmood）</span>
                  <select value={entry.mood} onChange={(e) => set(["journalEntries", i, "mood"], e.target.value)}>
                    {MOOD_OPTIONS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  className="admin-remove-btn"
                  onClick={() => setData((d) => ({ ...d, journalEntries: d.journalEntries.filter((_, j) => j !== i) }))}
                >
                  この記事を削除
                </button>
              </div>
            ))}
            <button
              type="button"
              className="admin-add-btn"
              onClick={() =>
                setData((d) => ({
                  ...d,
                  journalEntries: [
                    ...d.journalEntries,
                    { slug: "", date: "", title: "", location: "", mood: "dawn" },
                  ],
                }))
              }
            >
              ＋ 記事を追加
            </button>
            <p className="admin-field-hint">画像タブに新しい記事のスロットを表示するには、保存後にページを再読み込みしてください。</p>
          </Section>

          <Section title="入会までのステップ（4ステップ）">
            {data.applySteps.map((step, i) => (
              <div className="admin-item" key={i}>
                <Field label="番号" value={step.number} onChange={(v) => set(["applySteps", i, "number"], v)} />
                <Field label="ラベル" value={step.label} onChange={(v) => set(["applySteps", i, "label"], v)} />
                <Field label="小見出し" value={step.title} onChange={(v) => set(["applySteps", i, "title"], v)} />
                <TextAreaField label="説明文" value={step.description} onChange={(v) => set(["applySteps", i, "description"], v)} rows={2} />
              </div>
            ))}
          </Section>

          <Section title="ナビゲーション文言">
            {data.navLinks.map((link, i) => (
              <Field key={link.href} label={`「${link.href}」のラベル`} value={link.label} onChange={(v) => set(["navLinks", i, "label"], v)} />
            ))}
          </Section>

          <Section title="潮見表チッカー（ダミーデータ）">
            {data.tideData.map((tide, i) => (
              <div className="admin-item" key={i}>
                <div className="admin-row-3">
                  <Field label="拠点表記" value={tide.loc} onChange={(v) => set(["tideData", i, "loc"], v)} />
                  <Field label="時刻" value={tide.time} onChange={(v) => set(["tideData", i, "time"], v)} />
                  <label className="admin-field">
                    <span className="admin-field-label">満潮／干潮</span>
                    <select
                      value={tide.status}
                      onChange={(e) => {
                        const status = e.target.value as "満潮" | "干潮";
                        set(["tideData", i, "status"], status);
                        set(["tideData", i, "cls"], status === "満潮" ? "mitsu" : "hiki");
                      }}
                    >
                      <option value="満潮">満潮</option>
                      <option value="干潮">干潮</option>
                    </select>
                  </label>
                </div>
              </div>
            ))}
          </Section>
        </div>
      )}

      {tab === "images" && <ImageManager initialSlots={initialSlots} />}

      {tab === "text" && (
        <div className="admin-save-bar">
          <button type="button" onClick={handleSave} disabled={saving} className="btn primary">
            {saving ? "保存中…" : "保存する"}
          </button>
          {status && <span className={`admin-status admin-status--${status.type}`}>{status.message}</span>}
        </div>
      )}
    </div>
  );
}
