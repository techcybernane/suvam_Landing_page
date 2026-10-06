import { headers } from "next/headers";
import "./globals.css";
import { normalizeLocale, isRtl } from "../lib/i18n.js";

export const metadata = {
  title: "CybernaNet — Innovate. Secure. Transform.",
  description:
    "CybernaNet helps organizations build, secure and transform their digital environments through integrated technology solutions, cybersecurity, infrastructure engineering, software development and professional training.",
  // PNG/ICO (≥48px, square) so Google Search can show the brand mark in results.
  // SVG alone is not listed among Google's supported favicon formats.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  // Set by middleware; the admin app has no locale prefix and falls back.
  const locale = normalizeLocale((await headers()).get("x-locale"));

  return (
    <html lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Space Grotesk = display, Manrope = body, Instrument Serif = italic
            accent word, JetBrains Mono = kickers / counters / metric labels. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
