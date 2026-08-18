# 凪 NAGI — サブスクリプション民宿 公式サイト

**本サイトはWeb制作会社 Studio Poplar のポートフォリオのための架空案件です。** 実在の企業・個人・決済・予約機能はなく、フォームは送信の見た目のみを再現しています（実際のAPI連携・DB保存はありません）。

静的HTMLプロトタイプ（`nagi-site/`）をデザイン・コピー・コンポーネント構造の一次ソースとして、Next.js（App Router）+ TypeScript で本実装したものです。

**Live**: [nagi-nextjs.vercel.app](https://nagi-nextjs.vercel.app/)
**Repository**: [github.com/studio-poplar/nagi-nextjs](https://github.com/studio-poplar/nagi-nextjs)

## セットアップ

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いてください。

```bash
npm run build   # 本番ビルド
npm run start   # 本番ビルドの起動
npm run lint    # ESLint
```

## 技術スタック

- **フレームワーク**: Next.js 16（App Router）/ TypeScript
- **スタイリング**: Tailwind CSS v4（`@theme` でトークンを `nagi-*` プレフィックス付きユーティリティとして登録）＋ プロトタイプ由来の CSS変数（`--sand` `--ink` `--sea` `--flag` など、`app/globals.css` の `:root`）
- **フォント**: Shippori Mincho / Zen Kaku Gothic New / Space Mono（下記「実装メモ」参照）
- **アイコン/ビジュアル**: 独自SVG（外部アイコンライブラリ・実写ストック画像は不使用）
- **Lint/Format**: ESLint（Next.js標準構成）

## ページ構成

| ルート | 内容 |
|---|---|
| `/` | トップ（Hero / Concept / Locations / Plans / Day in life / Voices / Journal preview / CTA） |
| `/locations` | 拠点一覧（内房・能登・淡路・五島、交互レイアウト） |
| `/pricing` | 料金・プラン比較表・FAQ |
| `/journal` | 航海日誌（記事カード一覧。個別記事ページは本実装のスコープ外） |
| `/apply` | 入会案内・お申し込みフォーム（モック送信） |

## ディレクトリ

```
app/                 各ページ（App Router）
app/admin/           管理画面（ローカル開発専用。本番では自動的に無効化）
app/api/admin/       管理画面用API（content保存・画像アップロード。ローカル開発専用）
components/          Header / Footer / TideTicker / Scene / WaveDivider / Button / 各種カード / ApplyForm
components/admin/    管理画面のUIコンポーネント
content/site.json    サイト全文言・拠点・プラン・Journal記事などのデータ（唯一のソース）
lib/content.ts       content/site.json を読み込むアクセサ（getSiteData / saveSiteData）
lib/images.ts        public/images/ の画像スロット管理
public/images/       アップロードされた実写画像の置き場所（ファイル名の規約は下記「管理画面」参照）
```

## 管理画面（ローカル編集専用）

```bash
npm run dev
```

を起動した状態で [http://localhost:3000/admin](http://localhost:3000/admin) を開くと、以下ができます。

- **文言編集**：全ページの見出し・リード文・拠点データ・プラン・FAQ・航海日誌記事などを編集し「保存する」で `content/site.json` に書き込み
- **画像管理**：各セクション（Hero・Concept・4拠点・拠点ページSubhero・航海日誌記事）に画像をアップロード。ファイルは自動的に `public/images/` の規定のファイル名で保存され、対応するSceneコンポーネントがイラストから実写画像に自動的に切り替わります（未アップロードの間はイラストのまま）

編集後は GitHub Desktop 等でいつも通り commit / push すれば、Vercelが自動で本番に反映します。

管理画面はローカルの `npm run dev` でのみ動作します（`process.env.NODE_ENV === "development"` でガード）。本番ビルドでは `/admin` は常に「ローカル開発環境でのみ利用できます」という静的なメッセージのみが表示され、管理画面のUIコード自体もバンドルに含まれません。`/api/admin/*` も本番では常に403を返します。ファイル書き込みを伴う機能のため、意図的にVercel上では機能しない設計です。

## 実装メモ（プロトタイプからの変更点）

- **フォント読み込み**: 指示書では `next/font/google` の使用を想定していましたが、検証の結果 `Shippori Mincho` / `Zen Kaku Gothic New` の2書体は next/font のセルフホスト対象subsetに `latin` / `latin-ext`（Zen Kaku Gothic Newのみ `cyrillic` も）しか含まれておらず、`japanese` subset が提供されないため、next/font経由では日本語グリフが表示できないことを確認しました（`next/dist/compiled/@next/font/dist/google/font-data.json` で確認）。そのため本実装では、プロトタイプと同じ Google Fonts CSS2 API（`<link rel="stylesheet">`, `display=swap` 付き）を `app/layout.tsx` の `<head>` で直接読み込む方式を採用しています。
- **拠点ページの交互レイアウト**: 指示書 §6.2 は「画像左右→テキスト、次は逆」の交互レイアウトを明記していますが、配布された静的プロトタイプの `order` 指定は実際には4拠点すべてで画像が左側に固定される実装になっていました（背景色のみ交互）。本実装では指示書の記述通り、拠点ごとに画像/テキストの左右を交互に入れ替えています。
- **Tailwind構成**: `create-next-app` の最新安定版は Tailwind CSS v4（CSS-first設定）を採用しており、`tailwind.config.ts` は生成されません。トークンは `app/globals.css` 内の `@theme inline` ブロックで `nagi-*` プレフィックス付きユーティリティとして登録し、プロトタイプ由来のCSS変数（`--sand` 等）と対応づけています。
- **Scene コンポーネント**: 波のpathやランドマークの形状は代表例としてmood（`dawn` / `dusk` / `overcast` / `noon`）ごとに1パターンへ統一・再利用可能化しています（プロトタイプ側は同一moodでも配置ごとに微妙にpathが異なる装飾的なバリエーションでした）。`photo` propに実写画像パスを渡すと、そのファイルが存在する場合のみイラストから実写に自動的に差し替わります（`lib/images.ts` の `publicImageExists` によるサーバーサイドでのファイル存在チェック）。
- **CMS/管理画面**: 当初の指示書では「CMS連携は不要（記事データはハードコード）」というスコープでしたが、その後クライアントからの追加依頼により、ローカル編集専用の管理画面（`/admin`）を実装しています。データは単一の `content/site.json` に集約し、`lib/content.ts` の `getSiteData()` がリクエストのたびにファイルを読み直す設計（Node標準の `fs.readFileSync`、モジュールキャッシュに依存しない）にすることで、管理画面で保存した内容が即座にページへ反映されるようにしています。
- **ブランドコンセプトの改修**: 初期実装は「全国の漁村を巡る素朴な民宿」でしたが、クライアントからの追加ブリーフ（SANU 2nd Home を参考にした、京都・伊根の舟屋リノベーションによる静かなウェルネス系セカンドホーム）を受けて、NAGIブランドをそのまま維持しつつ「舟屋建築・薪サウナ・ボート係留・静けさ」を軸としたポジショニングに全面的にリライトしています（`docs/ine-funaya-brand-midjourney-briefs.md` にブランド世界観とMidjourneyプロンプト一式）。

## アクセシビリティ

- `prefers-reduced-motion: reduce` で潮見表チッカー・Sceneのpan/zoom・スクロールリビールを含む全アニメーションを停止
- 装飾用SVG（Sceneレイヤー・波形ディバイダー等）はすべて `aria-hidden="true"`
- `:focus-visible` に `--flag` 色のアウトラインを明示
- モバイル幅でナビがハンバーガーメニューに切り替わり、横スクロールカード・比較表もはみ出さず操作可能
