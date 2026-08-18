import fs from "node:fs";
import path from "node:path";
import type { SceneLandmark, SceneMood } from "@/components/Scene";

export type LocationId = "uchibo" | "noto" | "awaji" | "goto";

export interface Location {
  id: LocationId;
  order: string;
  region: string;
  name: string;
  description: string;
  tags: string[];
  mood: SceneMood;
  landmark: SceneLandmark;
  sunPosition: { top: string; left: string; size: number };
  access: string;
  capacity: string;
  facilities: string;
  season: string;
}

export interface Plan {
  id: string;
  name: string;
  kana: string;
  price: string;
  desc: string;
  features: string[];
  featuresDetail: string[];
  featured?: boolean;
}

export interface CompareRow {
  label: string;
  values: [string, string, string];
}

export interface Faq {
  question: string;
  answer: string;
  open?: boolean;
}

export interface DayStep {
  time: string;
  title: string;
  description: string;
}

export interface Voice {
  quote: string;
  who: string;
}

export interface JournalEntry {
  slug: string;
  date: string;
  title: string;
  location: string;
  mood: SceneMood;
}

export interface ApplyStep {
  number: string;
  label: string;
  title: string;
  description: string;
}

export interface TideDatum {
  loc: string;
  status: "満潮" | "干潮";
  time: string;
  cls: "mitsu" | "hiki";
}

export interface NavLink {
  href: string;
  label: string;
}

interface CtaCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  primaryCta?: string;
  secondaryCta?: string;
}

/** Legibility controls for copy overlaid on a Scene photo (hero/subhero only). */
export interface PhotoTextStyle {
  /** 0–1 darkening over the photo. Ignored in illustration mode, where the
   * hand-tuned vignette already handles contrast. Defaults to 0.35. */
  overlayOpacity?: number;
  /** CSS color for the overlaid text. Defaults to the brand's paper/sand tone. */
  textColor?: string;
  /** CSS color for an optional solid panel behind the text block. Unset/omitted = no panel. */
  textBackgroundColor?: string;
  /** 0–1 opacity of the text background panel. 0 or unset = no panel shown. */
  textBackgroundOpacity?: number;
}

interface SectionHeadCopy extends PhotoTextStyle {
  eyebrow: string;
  heading: string;
  lead?: string;
}

export interface ImageSetting {
  /** CSS brightness() multiplier, 1 = unchanged. */
  brightness?: number;
}

export interface SiteData {
  /** Per-image adjustments (brightness, etc.), keyed by filename under public/images/. */
  imageSettings: Record<string, ImageSetting>;
  site: { titleDefault: string; titleTemplate: string; description: string };
  footer: { tagline: string; copyright: string; disclaimer: string };
  home: {
    metaTitle: string;
    metaDescription: string;
    hero: PhotoTextStyle & {
      kicker: string;
      heading: string;
      lead: string;
      primaryCta: string;
      secondaryCta: string;
      metaLine1: string;
      metaLine2: string;
    };
    concept: { eyebrow: string; heading: string; paragraph1: string; paragraph2: string };
    locationsSection: SectionHeadCopy;
    plansSection: SectionHeadCopy & { cta: string };
    daySection: { eyebrow: string; heading: string };
    voicesSection: { eyebrow: string; heading: string };
    journalSection: SectionHeadCopy;
    cta: CtaCopy;
  };
  locationsPage: {
    metaTitle: string;
    metaDescription: string;
    subhero: SectionHeadCopy;
    cta: CtaCopy;
  };
  pricingPage: {
    metaTitle: string;
    metaDescription: string;
    intro: SectionHeadCopy;
    compareHeading: string;
    faqHeading: string;
    cta: CtaCopy;
  };
  journalPage: {
    metaTitle: string;
    metaDescription: string;
    intro: SectionHeadCopy;
    cta: CtaCopy;
  };
  applyPage: {
    metaTitle: string;
    metaDescription: string;
    intro: SectionHeadCopy;
    stepsSection: { eyebrow: string; heading: string };
    formSection: SectionHeadCopy;
  };
  navLinks: NavLink[];
  locations: Location[];
  plans: Plan[];
  compareRows: CompareRow[];
  faqs: Faq[];
  daySteps: DayStep[];
  voices: Voice[];
  journalEntries: JournalEntry[];
  applySteps: ApplyStep[];
  tideData: TideDatum[];
}

const SITE_JSON_PATH = path.join(process.cwd(), "content", "site.json");

/** Always reads content/site.json fresh from disk (no module-level caching),
 * so edits made through /admin are reflected on the very next request. */
export function getSiteData(): SiteData {
  const raw = fs.readFileSync(SITE_JSON_PATH, "utf-8");
  return JSON.parse(raw) as SiteData;
}

export function getLocation(id: LocationId): Location {
  const location = getSiteData().locations.find((l) => l.id === id);
  if (!location) throw new Error(`Unknown location: ${id}`);
  return location;
}

/** Used only by the local-dev-only /admin API route. */
export function saveSiteData(data: SiteData): void {
  fs.writeFileSync(SITE_JSON_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

/** CSS brightness() multiplier for an image, keyed by its public/images/ filename. Defaults to 1 (unchanged). */
export function getImageBrightness(filename: string): number {
  return getSiteData().imageSettings?.[filename]?.brightness ?? 1;
}

/** Used only by the local-dev-only /admin API route — merges one image's settings without touching the rest of site.json. */
export function setImageSetting(filename: string, setting: ImageSetting): void {
  const data = getSiteData();
  data.imageSettings = { ...data.imageSettings, [filename]: { ...data.imageSettings?.[filename], ...setting } };
  saveSiteData(data);
}
