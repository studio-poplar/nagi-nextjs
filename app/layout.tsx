import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getSiteData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = getSiteData();
  return {
    title: {
      default: site.titleDefault,
      template: site.titleTemplate,
    },
    description: site.description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { navLinks, tideData } = getSiteData();

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
        <Header navLinks={navLinks} tideData={tideData} />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
