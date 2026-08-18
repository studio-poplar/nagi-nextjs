import type { SceneLandmark, SceneMood } from "@/components/Scene";

export type LocationId = "uchibo" | "noto" | "awaji" | "goto";

export interface LocationDetail {
  label: string;
}

export interface Location {
  id: LocationId;
  order: string;
  region: string;
  name: string;
  description: string;
  tags: string[];
  mood: SceneMood;
  landmark: SceneLandmark;
  showBoat?: boolean;
  sunPosition: { top: string; left: string; size: number };
  access: string;
  capacity: string;
  facilities: string;
  season: string;
}

export const locations: Location[] = [
  {
    id: "uchibo",
    order: "01",
    region: "千葉県 富津市 ／ 東京湾",
    name: "凪 内房",
    description:
      "東京から車で90分。舟大工が代々使ってきた船小屋を、天井の梁を活かしたまま一棟に改修しました。水面とほぼ同じ高さのデッキテラスには専用の桟橋があり、小舟をそのまま係留できます。週末だけ都心を離れ、何もしない時間を過ごすための拠点です。",
    tags: ["水上デッキ×ボート係留", "薪サウナ", "最大6名"],
    mood: "dawn",
    landmark: "pier",
    showBoat: true,
    sunPosition: { top: "10%", left: "66%", size: 90 },
    access: "東京駅から車で約90分／内房線 大貫駅から送迎（要予約）",
    capacity: "最大6名",
    facilities: "薪サウナ、デッキテラス、専用桟橋（ボート係留可）、洗濯乾燥機",
    season: "通年（11月〜2月は薪サウナが特に人気）",
  },
  {
    id: "noto",
    order: "02",
    region: "石川県 輪島市 ／ 日本海",
    name: "凪 能登",
    description:
      "輪島の海際に佇む舟屋を、地元の塗師とともに一棟改修。荒磯の海鳴りを聞きながら、漆黒の梁と輪島塗の器に囲まれて過ごす、静けさに徹した滞在です。母屋にはプライベートの薪サウナも備えています。",
    tags: ["輪島塗の意匠", "薪サウナ", "最大6名"],
    mood: "overcast",
    landmark: "none",
    sunPosition: { top: "8%", left: "30%", size: 100 },
    access: "のと里山空港から車で40分／金沢駅から特急バス＋送迎",
    capacity: "最大6名",
    facilities: "薪サウナ、輪島塗の器一式、五右衛門風呂、デッキテラス",
    season: "9月〜11月（凪いだ海と紅葉）",
  },
  {
    id: "awaji",
    order: "03",
    region: "兵庫県 南あわじ市 ／ 瀬戸内海",
    name: "凪 淡路",
    description:
      "鳴門海峡を望む入江に浮かぶ、元船小屋を改修した一棟。潮の轟きが聞こえる日中と、夕凪の静寂に包まれる夜と、海の二つの表情を一日で味わえます。デッキ下の専用桟橋にはボートを係留できます。",
    tags: ["海峡ビュー", "薪サウナ", "最大6名"],
    mood: "dusk",
    landmark: "bridge",
    sunPosition: { top: "14%", left: "56%", size: 110 },
    access: "神戸淡路鳴門自動車道 西淡三原ICから車で15分",
    capacity: "最大6名",
    facilities: "薪サウナ、デッキテラス、専用桟橋（ボート係留可）、屋外シャワー",
    season: "3月〜5月（凪と夕景が美しい季節）",
  },
  {
    id: "goto",
    order: "04",
    region: "長崎県 五島市 ／ 東シナ海",
    name: "凪 五島",
    description:
      "潜伏キリシタンの教会群を望む入江に佇む舟屋。透明度抜群の海へ直接下りられるデッキテラスと、母屋のプライベート薪サウナが、都市の時間を忘れさせてくれます。",
    tags: ["透明度No.1の入り江", "薪サウナ", "最大6名"],
    mood: "noon",
    landmark: "church",
    sunPosition: { top: "8%", left: "50%", size: 90 },
    access: "福江港からフェリーで50分、桟橋から徒歩10分",
    capacity: "最大6名",
    facilities: "薪サウナ、手すり付きデッキテラス、専用桟橋（ボート係留可）、シュノーケル一式",
    season: "6月〜9月（海の透明度が最も高い時期）",
  },
];

export function getLocation(id: LocationId): Location {
  const location = locations.find((l) => l.id === id);
  if (!location) throw new Error(`Unknown location: ${id}`);
  return location;
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

export const plans: Plan[] = [
  {
    id: "nagi",
    name: "凪プラン",
    kana: "NAGI ／ 月1泊から",
    price: "¥58,000",
    desc: "まずは月に一度、何もしない時間を試したい方に。",
    features: ["平日利用が中心の方向け", "同行者1名まで宿泊費無料", "全拠点の薪サウナ利用可"],
    featuresDetail: [
      "平日利用が中心の方向け",
      "同行者1名まで宿泊費無料",
      "全拠点の薪サウナ利用可",
      "拠点変更 月1回まで",
    ],
  },
  {
    id: "shio",
    name: "潮プラン",
    kana: "SHIO ／ 月2泊から",
    price: "¥98,000",
    desc: "月に一度は拠点を移し、静けさを暮らしに取り入れたい方に。",
    features: ["週末+平日1泊を想定", "同行者2名まで宿泊費無料", "ボート利用の優先予約"],
    featuresDetail: [
      "週末+平日1泊を想定",
      "同行者2名まで宿泊費無料",
      "ボート利用の優先予約",
      "拠点変更 月2回まで",
    ],
    featured: true,
  },
  {
    id: "kou",
    name: "航プラン",
    kana: "KOU ／ 月4泊から",
    price: "¥168,000",
    desc: "拠点を巡りながら、仕事も休息も持ち込みたい方に。",
    features: [
      "同行者3名まで宿泊費無料",
      "専用ワークデスク・回線を優先確保",
      "会員限定のウェルネスプログラム優先案内",
    ],
    featuresDetail: [
      "同行者3名まで宿泊費無料",
      "専用ワークデスク・回線を優先確保",
      "会員限定のウェルネスプログラム優先案内",
      "拠点変更 回数無制限",
    ],
  },
];

export const compareRows: { label: string; values: [string, string, string] }[] = [
  { label: "月額会費", values: ["¥58,000", "¥98,000", "¥168,000"] },
  { label: "宿泊日数の目安", values: ["月1泊〜", "月2泊〜", "月4泊〜"] },
  { label: "同行者 無料枠", values: ["1名まで", "2名まで", "3名まで"] },
  { label: "拠点変更の上限", values: ["月1回", "月2回", "無制限"] },
  { label: "優先予約", values: ["—", "直前3日", "直前7日"] },
  { label: "ワークデスク確保", values: ["—", "—", "優先確保"] },
  { label: "解約までの最短期間", values: ["1ヶ月", "1ヶ月", "3ヶ月"] },
];

export const faqs: { question: string; answer: string; open?: boolean }[] = [
  {
    question: "4拠点以外に泊まることはできますか？",
    answer: "現在は内房・能登・淡路・五島の4拠点のみです。今後、瀬戸内・東北エリアへの拡張を予定しています。",
    open: true,
  },
  {
    question: "日数を使い切れなかった月はどうなりますか？",
    answer: "未使用分は翌月に限り繰り越しが可能です（上限2泊まで）。",
  },
  {
    question: "友人や家族だけで泊まることはできますか？",
    answer: "可能です。会員本人の同伴は必須ではありませんが、月1回までのご利用となります。",
  },
  {
    question: "解約後、再入会はできますか？",
    answer: "可能です。入会金は再度発生しますが、以前のプラン利用履歴は引き継がれます。",
  },
  {
    question: "各拠点の写真や間取りは事前に見られますか？",
    answer: "入会後にご案内する会員サイトで、拠点ごとの間取りと過去の滞在日誌をご覧いただけます。",
  },
];

export interface DayStep {
  time: string;
  title: string;
  description: string;
}

export const daySteps: DayStep[] = [
  {
    time: "06:00",
    title: "デッキで一杯を淹れる",
    description: "夜明けの光の中、デッキテラスでコーヒーを淹れる。波音以外、何も聞こえない時間。",
  },
  {
    time: "09:30",
    title: "舟で入江を巡る",
    description: "係留したボートで、朝凪の入江をゆっくりと一周する。予定は決めない。",
  },
  {
    time: "13:00",
    title: "薪サウナで整える",
    description: "母屋のプライベートサウナで汗を流し、そのまま海へ。拠点ごとに違う海の温度を楽しむ。",
  },
  {
    time: "18:30",
    title: "凪を待つ",
    description: "風がやみ、海面が鏡のようになる時間。デッキで夕凪を眺めながら、一日の輪郭をゆっくり手放す。",
  },
];

export interface Voice {
  quote: string;
  who: string;
}

export const voices: Voice[] = [
  {
    quote:
      "「平日は都心で経営会議、週末は内房でサウナと凪。デッキに座っているだけで、頭の中の会議が少しずつ静かになっていく。」",
    who: "潮プラン会員 ／ 経営者",
  },
  {
    quote:
      "「拠点ごとに、母屋の意匠も海の表情も違う。ただ、薪サウナと凪だけはどこも変わらない。それが安心する。」",
    who: "凪プラン会員 ／ 経営者",
  },
  {
    quote: "「五島では舟でしか行けない入江に、能登では輪島塗の器に。仕事の合間に、暮らしの解像度が上がっていく感覚がある。」",
    who: "航プラン会員 ／ 経営者",
  },
];

export interface JournalEntry {
  slug: string;
  date: string;
  title: string;
  location: string;
  mood: SceneMood;
}

export const journalEntries: JournalEntry[] = [
  { slug: "uchibo-2026-02-14", date: "2026.02.14", title: "小潮の日、船小屋の梁を磨き直す", location: "凪 内房", mood: "dawn" },
  { slug: "noto-2026-01-28", date: "2026.01.28", title: "輪島塗の器が、暮らしに馴染むまで", location: "凪 能登", mood: "overcast" },
  { slug: "goto-2025-12-06", date: "2025.12.06", title: "入江の透明度と、教会の鐘の音", location: "凪 五島", mood: "noon" },
  { slug: "awaji-2025-11-20", date: "2025.11.20", title: "薪サウナに火を入れる、はじめての夜", location: "凪 淡路", mood: "dusk" },
  { slug: "uchibo-2025-10-15", date: "2025.10.15", title: "台風のあと、デッキの手すりを直す", location: "凪 内房", mood: "dawn" },
  { slug: "goto-2025-09-02", date: "2025.09.02", title: "舟でしか行けない入江を、教わる", location: "凪 五島", mood: "noon" },
];

export interface ApplyStep {
  number: string;
  label: string;
  title: string;
  description: string;
}

export const applySteps: ApplyStep[] = [
  {
    number: "01",
    label: "面談",
    title: "オンライン面談",
    description:
      "フォーム送信後、3営業日以内に15分のビデオ面談日程をご案内します。暮らし方や希望の拠点をヒアリングします。",
  },
  {
    number: "02",
    label: "契約",
    title: "プラン確定・契約",
    description:
      "面談内容をもとにプランをご提案。オンラインで契約書に署名いただき、入会金と初月会費をお支払いいただきます。",
  },
  {
    number: "03",
    label: "発行",
    title: "会員サイト発行",
    description: "拠点ごとの間取りや過去の滞在日誌が読める、会員限定サイトのアカウントを発行します。",
  },
  {
    number: "04",
    label: "予約",
    title: "最初の宿泊予約",
    description: "会員サイトから空き状況を確認し、最初の拠点と日程を予約。到着日から鍵の受け渡し方法もご案内します。",
  },
];

export interface TideDatum {
  loc: string;
  status: "満潮" | "干潮";
  time: string;
  cls: "mitsu" | "hiki";
}

export const tideData: TideDatum[] = [
  { loc: "内房 UCHIBO", status: "満潮", time: "5:14", cls: "mitsu" },
  { loc: "能登 NOTO", status: "干潮", time: "11:02", cls: "hiki" },
  { loc: "淡路 AWAJI", status: "満潮", time: "16:47", cls: "mitsu" },
  { loc: "五島 GOTO", status: "干潮", time: "22:38", cls: "hiki" },
];

export const navLinks = [
  { href: "/", label: "トップ" },
  { href: "/locations", label: "拠点" },
  { href: "/pricing", label: "料金・プラン" },
  { href: "/journal", label: "航海日誌" },
];
