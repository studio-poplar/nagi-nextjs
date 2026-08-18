import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: {
    default: "凪 NAGI ｜ 海のセカンドホーム",
    template: "%s ｜ 凪 NAGI",
  },
  description:
    "凪(NAGI)は、全国の海辺に佇む舟屋を月額会費で暮らすように巡る、会員制のセカンドホームです。内房・能登・淡路・五島、四つの拠点に薪サウナとデッキテラスを備えて。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* next/font/google's self-hosted subsets for these 3 families cover
            only latin/latin-ext/cyrillic (no japanese) — verified against
            next/dist's font-data.json — so Japanese glyphs would silently
            fall back to a system font. Loading via the standard Google
            Fonts CSS2 endpoint (same mechanism as the static prototype)
            is required to actually render Japanese text in these faces.
            This root layout already applies to every route, so the
            single-page-load warning below doesn't apply here. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
