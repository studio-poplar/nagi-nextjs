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
app/            各ページ（App Router）
components/     Header / Footer / TideTicker / Scene / WaveDivider / Button / 各種カード / ApplyForm
lib/content.ts  拠点・プラン・Journal記事などのダミーデータ
```

## 実装メモ（プロトタイプからの変更点）

- **フォント読み込み**: 指示書では `next/font/google` の使用を想定していましたが、検証の結果 `Shippori Mincho` / `Zen Kaku Gothic New` の2書体は next/font のセルフホスト対象subsetに `latin` / `latin-ext`（Zen Kaku Gothic Newのみ `cyrillic` も）しか含まれておらず、`japanese` subset が提供されないため、next/font経由では日本語グリフが表示できないことを確認しました（`next/dist/compiled/@next/font/dist/google/font-data.json` で確認）。そのため本実装では、プロトタイプと同じ Google Fonts CSS2 API（`<link rel="stylesheet">`, `display=swap` 付き）を `app/layout.tsx` の `<head>` で直接読み込む方式を採用しています。
- **拠点ページの交互レイアウト**: 指示書 §6.2 は「画像左右→テキスト、次は逆」の交互レイアウトを明記していますが、配布された静的プロトタイプの `order` 指定は実際には4拠点すべてで画像が左側に固定される実装になっていました（背景色のみ交互）。本実装では指示書の記述通り、拠点ごとに画像/テキストの左右を交互に入れ替えています。
- **Tailwind構成**: `create-next-app` の最新安定版は Tailwind CSS v4（CSS-first設定）を採用しており、`tailwind.config.ts` は生成されません。トークンは `app/globals.css` 内の `@theme inline` ブロックで `nagi-*` プレフィックス付きユーティリティとして登録し、プロトタイプ由来のCSS変数（`--sand` 等）と対応づけています。
- **Scene コンポーネント**: 波のpathやランドマークの形状は代表例としてmood（`dawn` / `dusk` / `overcast` / `noon`）ごとに1パターンへ統一・再利用可能化しています（プロトタイプ側は同一moodでも配置ごとに微妙にpathが異なる装飾的なバリエーションでした）。

## アクセシビリティ

- `prefers-reduced-motion: reduce` で潮見表チッカー・Sceneのpan/zoom・スクロールリビールを含む全アニメーションを停止
- 装飾用SVG（Sceneレイヤー・波形ディバイダー等）はすべて `aria-hidden="true"`
- `:focus-visible` に `--flag` 色のアウトラインを明示
- モバイル幅でナビがハンバーガーメニューに切り替わり、横スクロールカード・比較表もはみ出さず操作可能
