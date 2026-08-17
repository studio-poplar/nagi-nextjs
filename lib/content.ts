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
      "東京から車で90分。干物づくりと素潜りの盛んな漁村で、朝は仲買人の競りを覗き、夕方は堤防で夕涼み。都心からの週末拠点として最も人気です。",
    tags: ["徒歩3分で船着場", "素潜り体験", "定員1〜3名"],
    mood: "dawn",
    landmark: "pier",
    showBoat: true,
    sunPosition: { top: "10%", left: "66%", size: 90 },
    access: "東京駅から車で約90分／内房線 大貫駅から送迎（要予約）",
    capacity: "1〜3名",
    facilities: "薪の七輪、干物用の網戸棚、簡易シャワー、洗濯機",
    season: "12月〜2月（寒干し）、7月〜8月（素潜り）",
  },
  {
    id: "noto",
    order: "02",
    region: "石川県 輪島市 ／ 日本海",
    name: "凪 能登",
    description:
      "輪島塗の工房が軒を連ねる旧家を改修。荒磯の海鳴りを聞きながら、地元の塗師や海女に手ほどきを受ける、手仕事に浸る滞在です。",
    tags: ["輪島塗体験工房", "薪ストーブ", "定員2〜4名"],
    mood: "overcast",
    landmark: "none",
    sunPosition: { top: "8%", left: "30%", size: 100 },
    access: "のと里山空港から車で40分／金沢駅から特急バス＋送迎",
    capacity: "2〜4名",
    facilities: "薪ストーブ、輪島塗の器一式、五右衛門風呂",
    season: "9月〜11月（荒磯漁最盛期）",
  },
  {
    id: "awaji",
    order: "03",
    region: "兵庫県 南あわじ市 ／ 瀬戸内海",
    name: "凪 淡路",
    description:
      "鳴門海峡を望む段々畑の中腹に立つ、玉ねぎ農家の納屋を改修した宿。渦潮の轟きと夕凪の静けさ、その両方を一日で味わえます。",
    tags: ["渦潮ビュー", "家庭菜園付き", "定員2〜5名"],
    mood: "dusk",
    landmark: "bridge",
    sunPosition: { top: "14%", left: "56%", size: 110 },
    access: "神戸淡路鳴門自動車道 西淡三原ICから車で15分",
    capacity: "2〜5名",
    facilities: "家庭菜園、屋外シャワー、玉ねぎ乾燥小屋を改装した離れ",
    season: "3月〜5月（渦潮・新玉ねぎ）",
  },
  {
    id: "goto",
    order: "04",
    region: "長崎県 五島市 ／ 東シナ海",
    name: "凪 五島",
    description:
      "潜伏キリシタンの教会群が点在する島の高台。透明度抜群の入り江を望むテラスがあり、椿油しぼりや素潜り漁の手伝いが体験できます。",
    tags: ["透明度No.1の海", "椿油づくり", "定員1〜4名"],
    mood: "noon",
    landmark: "church",
    sunPosition: { top: "8%", left: "50%", size: 90 },
    access: "福江港からフェリーで50分、桟橋から徒歩10分",
    capacity: "1〜4名",
    facilities: "手すり付きテラス、椿油の搾油機、シュノーケル一式",
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
    price: "¥38,000",
    desc: "まず海のある暮らしを試したい方に。",
    features: ["平日利用が中心の方向け", "同行者1名まで宿泊費無料", "前泊者の申し送りノート閲覧"],
    featuresDetail: [
      "平日利用が中心の方向け",
      "同行者1名まで宿泊費無料",
      "前泊者の申し送りノート閲覧",
      "拠点変更 月1回まで",
    ],
  },
  {
    id: "shio",
    name: "潮プラン",
    kana: "SHIO ／ 月2泊から",
    price: "¥68,000",
    desc: "月に一度は拠点を移したい方に。",
    features: ["週末+平日1泊を想定", "同行者2名まで宿泊費無料", "拠点間の移動サポート相談"],
    featuresDetail: [
      "週末+平日1泊を想定",
      "同行者2名まで宿泊費無料",
      "拠点間の移動サポート相談",
      "拠点変更 月2回まで",
    ],
    featured: true,
  },
  {
    id: "kou",
    name: "航プラン",
    kana: "KOU ／ 月4泊から",
    price: "¥128,000",
    desc: "拠点を巡りながら働く方に。",
    features: [
      "同行者3名まで宿泊費無料",
      "専用ワークデスク・回線を優先確保",
      "会員限定の漁師体験カレンダー優先案内",
    ],
    featuresDetail: [
      "同行者3名まで宿泊費無料",
      "専用ワークデスク・回線を優先確保",
      "会員限定の漁師体験カレンダー優先案内",
      "拠点変更 回数無制限",
    ],
  },
];

export const compareRows: { label: string; values: [string, string, string] }[] = [
  { label: "月額会費", values: ["¥38,000", "¥68,000", "¥128,000"] },
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
    title: "干場を覗く",
    description: "前夜に仕込んだ干物の様子を見に、宿の主から借りた自転車で船着場へ。",
  },
  {
    time: "09:30",
    title: "朝市に並ぶ",
    description: "地元の仲買人に混ざって、その日獲れたばかりの魚を選ぶ。晩ごはんはここで決まる。",
  },
  {
    time: "13:00",
    title: "手を動かす",
    description: "輪島塗の工房や玉ねぎ農家など、拠点ごとに異なる手仕事を少しだけ手伝わせてもらう。",
  },
  {
    time: "18:30",
    title: "凪を待つ",
    description: "風がやみ、海面が鏡のようになる時間。縁側で夕凪を眺めながら、獲れたての魚をあぶる。",
  },
];

export interface Voice {
  quote: string;
  who: string;
}

export const voices: Voice[] = [
  {
    quote:
      "「平日は東京、週末は内房。仕事の合間に潮の匂いを吸うだけで、頭の中の締め切りが少し遠くなる。」",
    who: "潮プラン会員 ／ Web制作 3年目",
  },
  {
    quote:
      "「拠点ごとに前の会員が残した申し送りノートがあって、知らない土地なのに知り合いの家に泊まるような安心感があった。」",
    who: "凪プラン会員 ／ 編集者",
  },
  {
    quote: "「五島では潜り漁のおじさんに、能登では塗師のおばあちゃんに。会うたびに海の仕事を少しずつ教わっている。」",
    who: "航プラン会員 ／ 個人事業主",
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
  { slug: "uchibo-2026-02-14", date: "2026.02.14", title: "小潮の日、干物用の網を編み直す", location: "凪 内房", mood: "dawn" },
  { slug: "noto-2026-01-28", date: "2026.01.28", title: "輪島塗の刷毛が壊れるまで", location: "凪 能登", mood: "overcast" },
  { slug: "goto-2025-12-06", date: "2025.12.06", title: "椿の実を拾いに、教会の裏山へ", location: "凪 五島", mood: "noon" },
  { slug: "awaji-2025-11-20", date: "2025.11.20", title: "新玉ねぎの前に、土をつくる", location: "凪 淡路", mood: "dusk" },
  { slug: "uchibo-2025-10-15", date: "2025.10.15", title: "台風のあと、堤防を歩く", location: "凪 内房", mood: "dawn" },
  { slug: "goto-2025-09-02", date: "2025.09.02", title: "潜り漁のおじさんに教わった、息の止め方", location: "凪 五島", mood: "noon" },
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
