# 凪 NAGI — Midjourney 画像生成 指示書

Scene（CSS/SVGの疑似ビジュアル）を実写風のAI生成画像に差し替えるための、画像13点ぶんの指示書です。架空案件のため、実在の建造物名・地名の固有名詞（例：鳴門海峡大橋そのもの）はプロンプトに含めず、あくまで「〜のような」抽象化した描写にしています。

## 共通スタイルガイド（全プロンプト共通の前提）

生成前に必ず把握してください。個別プロンプトはこのスタイルを踏まえた上で書かれています。

- **写真の質感**：35mm判フィルムのような自然な粒状感、ドキュメンタリー/エディトリアル風。CGっぽい過度な鮮やかさやHDR感は避ける。
- **色温度**：サイトのブランドカラーに寄せる。
  - 砂 `#F1ECE0` ／ 藍 `#1C2A33` ／ 潮(緑青) `#4B7A72` ／ 差し色の朱 `#A5432F`（使いすぎない）
  - 各拠点のmood（下記）ごとに色温度を変える
- **人物**：顔がはっきり写る構図は避ける。手元・後ろ姿・シルエットなど「気配」程度の写り込みに留める（AI生成特有の顔の破綻を避けつつ、実在の人物と誤認されるリスクも避けるため）。
- **NG要素**：文字・看板・ロゴ・商標・透かし・実在する固有の建造物そのものの再現は避ける（`--no text, signage, logo, watermark` を全プロンプト末尾に付与）。
- **推奨パラメータ**：`--v 6.1 --style raw` を基本とし、各画像ごとに `--ar` のみ変更。

---

## 1. Hero（トップページ）

- **配置**：`app/page.tsx` のHeroセクション（画面いっぱい、`--ar 16:9` 推奨）
- **書き出し先**：`public/images/hero-uchibo-dawn.jpg`
- **mood**：dawn（暁）

```
A calm fishing bay at dawn in Japan, gentle ripples on still water reflecting a soft orange-gold sunrise, a weathered wooden fishing boat silhouetted near the shore, distant misty green hills, a small wooden pier extending into the water, muted warm sand and deep teal-green color palette, cinematic documentary photography, soft natural light, 35mm film grain, wide tranquil composition with negative space at the top for text overlay, no people's faces visible --ar 16:9 --v 6.1 --style raw --no text, signage, logo, watermark
```

**補足**：上部1/3を後からロゴ・見出しテキストを重ねるための余白として空けたいので、「negative space at the top」を保持してください。

---

## 2. Concept（トップページ 「住むところを、ひとつに決めない。」セクション）

- **配置**：`app/page.tsx` のConceptセクション（`--ar 4:5`）
- **書き出し先**：`public/images/concept-life.jpg`
- **mood**：dawn寄りだが、より生活感のあるカット

```
A cozy renovated Japanese fishing village guesthouse interior opening onto the sea, low wooden engawa porch, a pair of worn sandals by the doorway, folded futon bedding visible, warm morning light streaming in, steam rising from a kettle over a small charcoal grill, ocean visible through open sliding doors, muted sand and warm wood tones with a hint of deep teal green outside, lived-in and quiet, editorial lifestyle photography, 35mm film grain, no visible faces --ar 4:5 --v 6.1 --style raw --no text, signage, logo, watermark
```

---

## 3〜6. 拠点カード（トップページ横スクロールカード＋拠点ページ）

各拠点は **同じ画像を2箇所で使い回します**（トップページの横スクロールカードは `--ar 4:3` 相当にCSSでクロップ、拠点ページの大判figureは元画像の `--ar 4:5` のまま使用）。そのため生成は **縦長 4:5 で1枚ずつ** にしてください。

### 3. 凪 内房（千葉県 富津市／東京湾）

- **書き出し先**：`public/images/location-uchibo.jpg`
- **mood**：dawn／ランドマーク：桟橋／船あり

```
A small fishing village pier at sunrise on a calm bay in Chiba, Japan, a traditional wooden fishing boat moored beside a simple wooden jetty, racks of drying fish (himono) hanging nearby, soft golden dawn light, gentle mist over the water, distant low green hills, warm sand tones with deep teal-green sea, quiet documentary travel photography, 35mm film grain, no visible faces --ar 4:5 --v 6.1 --style raw --no text, signage, logo, watermark
```

### 4. 凪 能登（石川県 輪島市／日本海）

- **書き出し先**：`public/images/location-noto.jpg`
- **mood**：overcast（曇天）／ランドマークなし

```
A rugged rocky coastline on the Sea of Japan under an overcast sky, weathered old wooden houses with dark tile roofs along the shore, a traditional lacquerware workshop interior glimpsed through an open door with red and black urushi bowls, moody muted grey-green color palette, mist and soft diffused light, quiet and austere atmosphere, documentary travel photography, 35mm film grain, no visible faces --ar 4:5 --v 6.1 --style raw --no text, signage, logo, watermark
```

### 5. 凪 淡路（兵庫県 南あわじ市／瀬戸内海）

- **書き出し先**：`public/images/location-awaji.jpg`
- **mood**：dusk（夕凪）／ランドマーク：海峡にかかる橋のシルエット

```
Terraced onion fields on a hillside overlooking a narrow sea strait at dusk, a distant suspension bridge silhouette spanning the strait in the background haze, warm orange and vermillion sunset light over calm water, a renovated wooden farm barn in the foreground, soft whirlpool ripples visible in the strait below, warm dusky color palette, tranquil evening calm (yunagi), documentary travel photography, 35mm film grain, no visible faces --ar 4:5 --v 6.1 --style raw --no text, signage, logo, watermark
```

### 6. 凪 五島（長崎県 五島市／東シナ海）

- **書き出し先**：`public/images/location-goto.jpg`
- **mood**：noon（快晴）／ランドマーク：教会のシルエット

```
A bright turquoise clear-water inlet on a remote Japanese island at midday, a small white wooden church with a simple cross silhouette on a hilltop in the distance, sunlit terrace overlooking the sea, camellia trees nearby, vivid but natural clear turquoise and emerald sea color, crisp bright daylight, high visibility clear water, documentary travel photography, 35mm film grain, no visible faces --ar 4:5 --v 6.1 --style raw --no text, signage, logo, watermark
```

---

## 7. Locations page 用サブヒーロー（`/locations` 冒頭バナー）

- **配置**：`app/locations/page.tsx` の `.subhero`（`--ar 16:9`）
- **書き出し先**：`public/images/locations-subhero.jpg`
- **mood**：dawn、4拠点を象徴する俯瞰的なカット

```
An aerial drone view of a rugged Japanese coastline at dawn, four distinct small fishing coves visible along the shore connected by a winding coastal road, calm sea with soft golden morning light, patches of misty green hills, muted sand and deep teal-green color palette, wide panoramic documentary travel photography, 35mm film grain, no visible people --ar 16:9 --v 6.1 --style raw --no text, signage, logo, watermark
```

---

## 8〜13. 航海日誌（Journal）記事サムネイル

`--ar 5:4` で統一。各記事の内容・拠点moodに合わせています。

### 8. 「小潮の日、干物用の網を編み直す」（凪 内房・2026.02.14）

- **書き出し先**：`public/images/journal-uchibo-net.jpg`

```
Close-up of weathered hands repairing a fishing net used for drying fish, sitting on a wooden pier at soft dawn light, coils of rope and bamboo racks nearby, warm sand and muted teal-green tones, shallow depth of field, quiet documentary photography, 35mm film grain, hands visible but no face --ar 5:4 --v 6.1 --style raw --no text, signage, logo, watermark
```

### 9. 「輪島塗の刷毛が壊れるまで」（凪 能登・2026.01.28）

- **書き出し先**：`public/images/journal-noto-brush.jpg`

```
Close-up of a craftsman's worn lacquerware brush and small red and black urushi bowls on a wooden workshop table, soft overcast window light, muted grey-green tones, shallow depth of field, quiet artisanal atmosphere, documentary photography, 35mm film grain, hands visible but no face --ar 5:4 --v 6.1 --style raw --no text, signage, logo, watermark
```

### 10. 「椿の実を拾いに、教会の裏山へ」（凪 五島・2025.12.06）

- **書き出し先**：`public/images/journal-goto-camellia.jpg`

```
A wicker basket filled with camellia seeds on a hillside path, a small white church silhouette faintly visible through trees in the background, soft bright midday light filtering through leaves, natural greens with a hint of turquoise sea in the distance, documentary nature photography, 35mm film grain, no visible faces --ar 5:4 --v 6.1 --style raw --no text, signage, logo, watermark
```

### 11. 「新玉ねぎの前に、土をつくる」（凪 淡路・2025.11.20）

- **書き出し先**：`public/images/journal-awaji-soil.jpg`

```
Close-up of soil being turned by hand on a terraced onion field at dusk, warm orange evening light, a distant sea strait visible beyond the field, warm earthy tones, shallow depth of field, quiet agricultural documentary photography, 35mm film grain, hands visible but no face --ar 5:4 --v 6.1 --style raw --no text, signage, logo, watermark
```

### 12. 「台風のあと、堤防を歩く」（凪 内房・2025.10.15）

- **書き出し先**：`public/images/journal-uchibo-typhoon.jpg`

```
A quiet concrete breakwater after a storm, wet stone surface reflecting soft grey-gold overcast light, scattered seaweed and driftwood, calm sea slowly settling in the background, muted subdued color palette, contemplative documentary photography, 35mm film grain, no visible people --ar 5:4 --v 6.1 --style raw --no text, signage, logo, watermark
```

### 13. 「潜り漁のおじさんに教わった、息の止め方」（凪 五島・2025.09.02）

- **書き出し先**：`public/images/journal-goto-freediving.jpg`

```
A weathered wooden free-diving boat floating on bright clear turquoise water, a snorkel and mask resting on the boat's edge, sunlit ripples, distant green island coastline, vivid but natural clear sea color, midday documentary travel photography, 35mm film grain, no visible faces --ar 5:4 --v 6.1 --style raw --no text, signage, logo, watermark
```

---

## 生成後の作業（私の方で対応します）

画像が揃ったら `public/images/` 配下に上記のファイル名で置いていただければ、各コンポーネント（`Scene` の代わりに `next/image` を使う形）に組み込みます。Scene（CSS/SVG）は残しつつ差し替えるか完全に置き換えるかは、実際の生成結果を見てから判断するのがおすすめです（雰囲気が合わなければ一部だけ差し替える、なども可能です）。
