# 伊根 舟屋セカンドホーム — ブランド世界観 & Midjourney クリエイティブディレクション

参考：SANU 2nd Home（山ではなく「海」）。京都府伊根町の舟屋をリノベーションした、定員6名・海に面したデッキテラス・ボート係留可能な一棟貸しセカンドホーム。ターゲットは30〜50代の都市部経営者・高所得層。「予約したくなる画像」ではなく「この場所で暮らしてみたい」と思わせるブランド体験の構築が目的。

## 使い方

- 各シーンのコードブロックは、共通ベース＋固有の描写＋アスペクト比＋共通ネガティブまで**すべて合体済み**です。そのまま丸ごとコピーして、MidjourneyのWeb版（画面上部の「What will you imagine?」欄）またはDiscordの `/imagine` に貼り付けるだけで使えます。分割・組み合わせ作業は不要です。
- **進める順番の目安**：①ヒーロービジュアル → ②海側外観 のどちらかを最初に数パターン生成し、トーン（色味・粒状感・明るさ）が気に入るものを1枚選ぶ。以降のシーンでそのSeed値（画像を開いて「...」→ Copy Seed）を他のプロンプト末尾に `--seed 12345` として追加すると、全シーンのトーンが揃いやすくなります。
- 生成後、気に入った1枚を右クリック→Vary(Subtle)やUpscaleで仕上げてください。

## サイトへの反映方法（コードは対応済み）

生成した画像は、下の表のファイル名で `public/images/` フォルダに置くだけで、そのままサイトに反映されます（コード側は対応済みなので、私への依頼は不要です）。同じ名前で置けば、これまでのイラスト（Scene）が自動的に実写に置き換わります。ファイルが無い間は、今まで通りイラストのままなので、サイトが壊れることはありません。

| サイト上の場所 | ファイル名 | 元にするプロンプト |
|---|---|---|
| トップページ ヒーロー | `hero-uchibo-dawn.jpg` | ①ヒーロービジュアル |
| トップページ コンセプト | `concept-life.jpg` | ⑯朝のコーヒー、または⑩リビング |
| 拠点カード／拠点ページ：内房 | `location-uchibo.jpg` | ⑥海側外観、または⑧ボート係留シーン |
| 拠点カード／拠点ページ：能登 | `location-noto.jpg` | ⑥海側外観、または⑨集落との一体感（すでに生成済みの能登の画像がこれに近いです） |
| 拠点カード／拠点ページ：淡路 | `location-awaji.jpg` | ⑥海側外観、または②ドローン全景 |
| 拠点カード／拠点ページ：五島 | `location-goto.jpg` | ③夕景、または②ドローン全景 |
| 拠点ページ サブヒーロー | `locations-subhero.jpg` | ②ドローン全景 |
| Journal記事6点 | `journal-uchibo-2026-02-14.jpg` など、`lib/content.ts` の `slug` に `journal-` を付けたファイル名 | ⑪〜㉕から記事の雰囲気に近いもの |

4拠点それぞれの画像は、⑥や②のプロンプトをそのまま4回生成しても構いません（同じ建築様式という設定なので、似た雰囲気で統一感が出ます）。地域差を出したい場合は、プロンプト内の "Ine, Kyoto" の部分を "a quiet bay in Chiba, Japan"（内房）や "a rocky coast in Ishikawa, Japan"（能登）などに置き換えてみてください。

---

## 1. ブランド世界観定義

### 1.1 トーン&マナー

- **静けさ＞豪華さ**：装飾や演出過多を避け、間（余白）そのものを高級表現とする。
- **人の気配は控えめに**：モデルが「ポーズを取っている」写真は禁止。手元・後ろ姿・遠景のシルエットなど、生活の痕跡としての人物のみ。
- **建築が主役**：舟屋の梁・古材・海に浮かぶ構造そのものを常に画面の芯に置く。海は背景ではなく共演者。
- **一言で言うなら**：「何もしない贅沢」「都市から離れ、自分を取り戻す場所」。トロピカルリゾートの高揚感ではなく、禅とウェルネスの静寂。

### 1.2 カラーパレット

| 名称 | 色味 | 用途 |
|---|---|---|
| 焼杉 (Yakisugi charcoal) | 深い墨黒〜焦茶 | 外観の焼杉板張り、古材の梁 |
| 生成り (Kinari sand) | くすんだ生成り・砂色 | リネン、畳、漆喰壁 |
| 灰藍 (Slate indigo) | 曇天の海・空の灰がかった藍 | 海面、空、夕景の遠景 |
| 白亜 (Soft warm white) | 温かみのあるオフホワイト | 北欧的な内装の壁・什器 |
| 差し色・墨 (Sumi ink accent) | ほぼ黒に近い墨色 | 什器・金物のごく一部のみ。使用は最小限 |

**厳守**：南国的な鮮やかなターコイズ・ピンク・ゴールドの多用、ガラス張り現代ヴィラのような無機質なグレー×ネオンは禁止。彩度は全体的に低〜中、コントラストも穏やかに。

### 1.3 写真トーン

- 中判フィルム（Hasselblad/Fuji GFXのような）で撮ったような質感。粒状感は控えめ、シャープすぎない。
- 露出は「引き算」。白飛び・黒つぶれを避け、フラットに近いラティチュードの広いトーン。
- 参考誌面：Cereal Magazine、Kinfolk、Norm Architects のポートフォリオ、SANU 2nd Home公式サイト。

### 1.4 構図ルール

- 水平線（海と空の境界）は常に水平を保ち、フレームの1/3〜1/2の高さに配置。
- 余白は画面の40〜60%を目安に確保。被写体を詰め込みすぎない。
- 舟屋の梁や柱、障子・建具越しに「フレーム・イン・フレーム」で奥行きを作る。
- 人物は画面の隅・遠景・部分（手・足・後ろ姿）に留め、中央に配置しない。

### 1.5 光の演出

- 主：夜明け／夕暮れのゴールデンアワー（柔らかい斜光）。
- 副：曇天の拡散光（フラットで静かな内装カットに使用）。
- 夜：暖色の間接照明・ろうそくのような灯りのみ。人工的なスタジオ光は禁止。
- 内装は自然光を基本とし、窓・障子からの光を主光源として扱う。

### 1.6 被写体の考え方

- 「誰かがそこで暮らしている痕跡」は見せるが「その人自体」は見せない：淹れたてのコーヒー、開いた本、脱いだサンダル、波打ち際の足跡。
- 人物を入れる場合も、顔がはっきり分かる構図・ポーズを取ったような表情は避ける。
- 主役は常に「建築×海×光」の3要素。

---

## 2. Midjourney 共通ベース（参考・編集不要）

以下は全プロンプトに織り込み済みです。トーンを調整したくなった時のために掲載していますが、通常は下記3〜4章のブロックをそのままコピペしてください。

**ベース**：Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated

**共通ネガティブ**：tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera

---

## 3〜4. シーン別 Midjourney 最終出力（コピペ用・完成形）

### TOPページ

#### 1. ヒーロービジュアル

- **狙い**：サイト着地の1秒で「静けさ」を伝える。ブランドの世界観そのもの。
- **構図**：水面すれすれの低い視点。舟屋が画面下1/3、上2/3は空と海の余白。
- **推奨アスペクト比**：21:9

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a low-angle view at water level facing a solitary funaya residence floating quietly on still water at first light, the building occupying the lower third of the frame, vast calm sky and sea filling the upper two-thirds, mirror-like water reflection, extreme tranquility, cinematic negative space --ar 21:9 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 2. ドローン全景

- **狙い**：伊根の入江と集落における建築のスケール感・立地の希少性を伝える。
- **構図**：真上よりやや斜めのドローン俯瞰。周囲の入江・山の稜線を含める。
- **推奨アスペクト比**：16:9

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a high aerial drone view of a secluded cove in Ine, Kyoto, a single renovated funaya boathouse residence built over the water at the edge of a traditional boathouse village, dark timber roofs, calm turquoise-grey inlet water, forested mountain ridges surrounding the bay, soft dawn haze --ar 16:9 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 3. 夕景

- **狙い**：一日の終わり、都市の喧騒からの解放を象徴。
- **構図**：デッキテラスから海を見た視点。シルエットのみの人物の後ろ姿を遠景に小さく。
- **推奨アスペクト比**：16:9

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, view from a wooden deck terrace at dusk, warm orange and deep indigo sunset light over calm water, a small distant silhouette of a person sitting alone facing the sea, wooden deck chair, steam rising from a cup, extreme quietness --ar 16:9 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 4. 朝景

- **狙い**：目覚めの静けさ、一日の始まりの余白。
- **構図**：室内から障子越しに見える朝の海。
- **推奨アスペクト比**：16:9

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, soft morning light filtering through a paper shoji screen door, a sliver of calm sea and misty mountains visible through the half-open door, steam from a teacup on a low wooden table in the foreground, muted cool morning tones --ar 16:9 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 5. テラス

- **狙い**：デッキテラスという設備そのものの訴求。
- **構図**：テラス全体が分かる引きの構図、海と直結している一体感。
- **推奨アスペクト比**：3:2

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a wide wooden deck terrace extending directly over the water from the funaya residence, built-in low bench seating, a single linen cushion, unobstructed view of the calm bay, no railings blocking the horizon, minimal furniture --ar 3:2 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

---

### 外観

#### 6. 海側外観

- **狙い**：「海の上に建つ木造建築」という核となる資産性の証明カット。
- **構図**：正面やや低い位置から、建物全体と水面への浮遊感を強調。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, full elevation view from the water of a funaya boathouse residence, dark yakisugi cedar cladding, the lower level open directly to the water for boat mooring, upper level renovated with large timber-framed windows, calm reflective water beneath the structure --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 7. 正面外観

- **狙い**：陸側からのアプローチ、集落の一部としての佇まい。
- **構図**：石畳の小径から見た正面ファサード。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, front facade view from a narrow stone pathway in a traditional Japanese boathouse village, weathered dark wood entrance, simple unmarked wooden door, small potted plant by the entrance, quiet residential street atmosphere --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 8. ボート係留シーン

- **狙い**：「ボート係留可能」という機能の情緒的な訴求。
- **構図**：建物1階の係留スペースを内側から見た構図、光と影のコントラスト。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, interior view of a traditional boat garage beneath the residence, a small wooden boat moored quietly inside, dark timber structure, soft daylight entering from the open water-side opening, reflections of light on the water surface and ceiling beams --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 9. 集落との一体感

- **狙い**：伊根の歴史的景観を壊さず溶け込んでいることの証明。
- **構図**：隣接する伝統的な舟屋群と並んだ引きの外観カット。
- **推奨アスペクト比**：16:9

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a row of traditional funaya boathouses along a calm inlet in Ine, Kyoto, the renovated residence indistinguishable in exterior style from its historic neighbors, consistent dark timber and tile roofline, gentle morning mist over the water --ar 16:9 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

---

### 内装

#### 10. リビング

- **狙い**：北欧的な温かみ×日本建築の静けさの融合。
- **構図**：低い目線、窓の外の海が主題になるよう家具は最小限。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a minimalist living room interior with exposed aged timber beams, a low linen sofa, a single wool throw, warm wood flooring, large window framing a calm sea view, Scandinavian-Japanese fusion furniture, soft diffused daylight --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 11. ダイニング

- **狙い**：6名で囲める食卓、静かな団らんの余白。
- **構図**：長机を横から見た構図、海の光が差し込む。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a long solid wood dining table for six with simple wooden chairs, minimal ceramic tableware, soft natural side light from a nearby window overlooking the sea, warm and unhurried atmosphere, no people seated --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 12. キッチン

- **狙い**：上質だが生活感のある道具の質感。
- **構図**：作業台のクローズアップ寄り、道具の陰影を活かす。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a minimalist kitchen counter with natural stone and dark wood surfaces, a few carefully chosen ceramic and iron cooking tools, soft morning light from a window above the sink, quiet still-life composition, no people --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 13. 主寝室

- **狙い**：静養の質、上質な寝具のテクスチャー。
- **構図**：ベッドと窓の海景を対角線上に配置。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a serene primary bedroom with a low platform bed, natural linen bedding in muted tones, exposed timber ceiling beams, a large window with a calm sea view, soft early morning light, minimal decor --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 14. セカンドベッドルーム

- **狙い**：主寝室と差別化しつつ同じ世界観であることを示す。
- **構図**：やや小ぶりな空間、障子越しの柔らかい光。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a smaller secondary bedroom with twin low wooden beds, simple linen bedding, a paper shoji screen window diffusing soft daylight, minimal Japanese-Scandinavian furniture, calm and understated --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 15. バスルーム

- **狙い**：ウェルネス訴求（サウナ的な質感含む）。
- **構図**：石・木・湯気のテクスチャーを主役に。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a minimalist bathroom with a natural stone soaking tub, dark wood sauna-style paneling, soft steam in the air, a small window with a glimpse of the sea, warm indirect lighting, spa-like tranquility --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

---

### ウェルネス

#### 16. 朝のコーヒー

- **狙い**：「何もしない贅沢」の象徴カット。
- **構図**：手元と湯気のクローズアップ、背景は大きくぼかした海。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, close-up of hands holding a simple ceramic coffee cup with steam rising, soft morning light, a blurred calm sea visible in the background through a window, quiet unhurried moment, no visible face --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 17. 読書

- **狙い**：静養・自分の時間の質。
- **構図**：デッキチェアに座る人物の後ろ姿・遠景シルエット。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a distant back-view silhouette of a person reading a book in a low wooden deck chair facing the sea, soft afternoon light, open book, minimal styling, extreme calm, no visible face --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 18. 瞑想

- **狙い**：ウェルネスリトリートとしての精神性。
- **構図**：畳やデッキに座る後ろ姿、水平線と同じ高さの目線。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a distant back-view silhouette of a person sitting cross-legged in quiet meditation on a wooden deck facing the calm sea at dawn, soft misty light, minimal composition, extreme stillness, no visible face --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 19. 海を眺める時間

- **狙い**：「何もしない」時間そのものの可視化。
- **構図**：大きな窓辺、椅子は一脚のみ、人物なしでも成立する構図。
- **推奨アスペクト比**：3:2

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a single simple wooden chair positioned by a large window overlooking a calm sea, soft afternoon light, empty and inviting, a folded blanket draped over the armrest, extreme minimalism and negative space, no people --ar 3:2 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 20. デジタルデトックス

- **狙い**：都市からの切断、静けさへの回帰。
- **構図**：閉じたノートと置かれたスマートフォン、自然物との対比。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a closed notebook and a phone placed face-down on a low wooden table, next to a small branch of pine and a lit candle, soft evening light, quiet symbolic still life about disconnecting from the city, no people --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

---

### ライフスタイル

#### 21. 友人6名での滞在

- **狙い**：定員6名という規模感を、賑やかすぎず上質に見せる。
- **構図**：デッキやリビングでの緩やかな団らん、全員が同じ方向を向いていない自然な配置。
- **推奨アスペクト比**：3:2

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a small group of six friends gathered loosely on a wooden deck terrace at golden hour, relaxed candid postures, some standing near the water's edge, some seated, distant and softly lit, no posed group photo composition, no visible faces in focus --ar 3:2 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 22. ワーケーション

- **狙い**：都市部経営者層への実用的な訴求（静かな仕事環境）。
- **構図**：ノートパソコンと海を同一フレームに、緊張感のない配置。
- **推奨アスペクト比**：4:5

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a laptop closed or resting quietly on a low wooden desk positioned beside a large window with a calm sea view, a notebook and pen nearby, soft daylight, unhurried and quiet working atmosphere, no people --ar 4:5 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 23. ボート体験

- **狙い**：ボート係留の実用性を体験価値として見せる。
- **構図**：桟橋から見た、乗船前後の静かな一瞬。
- **推奨アスペクト比**：3:2

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a small wooden boat gently moored at a private jetty beside the funaya residence, a distant figure stepping aboard, calm reflective water, soft morning light, quiet anticipation rather than action, no visible face --ar 3:2 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 24. サンセットタイム

- **狙い**：一日のハイライト、感情的な余韻。
- **構図**：水平線に沈む夕日を中心に、極端に引いた構図。
- **推奨アスペクト比**：21:9

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, an extremely wide and quiet view of the sun setting over a calm bay in Ine, Kyoto, the funaya residence as a small dark silhouette at the edge of the frame, vast sky in warm fading gradients, profound stillness --ar 21:9 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

#### 25. 夜の静かな時間

- **狙い**：夜という「何もしない」時間帯の締めくくり。
- **構図**：室内の暖色照明が水面に映るカット。
- **推奨アスペクト比**：16:9

```
Editorial architectural photography of a renovated traditional Japanese funaya boathouse residence in Ine, Kyoto, built directly above calm coastal water, weathered charcoal-black yakisugi charred cedar exterior siding, aged timber beams and posts with visible grain, minimalist Japanese interior with Scandinavian warmth, abundant negative space, quiet contemplative mood, soft natural light, muted sand and slate-grey color palette with near-black wood accents, medium format film photography, subtle film grain, low contrast, no oversaturation, luxury travel magazine editorial style, serene and understated, a night exterior view of the funaya residence, warm soft interior lighting glowing through timber-framed windows, gentle reflections on still dark water, a faint crescent moon, extremely quiet and intimate atmosphere --ar 16:9 --v 6.1 --style raw --no tropical resort, Bali style, Hawaiian style, Dubai style, glass modern villa, flashy luxury hotel, over-styled staging, futuristic AI architecture, neon colors, oversaturated colors, visible logos, text, watermark, posed model, visible faces looking at camera
```

---

## 備考

- ブランド名は本書では未確定のため、プロンプト中では固有名詞を使わず「a funaya residence」等の一般表現に留めています。名称が決まり次第、サイト側のコピーと合わせて反映します。
- 伊根の実在する特定の建造物・看板・店名を直接再現するような描写は避けています（実在の景観に酷似しすぎる生成物は、実在の所有者・住民との誤認リスクがあるため）。
- サイト本体（`nagi-nextjs`）への反映は、ブランド名・料金/予約モデル（月額会員制→一棟貸しの一棟貸し予約制への変更など）を含めて別途すり合わせのうえ進めます。
