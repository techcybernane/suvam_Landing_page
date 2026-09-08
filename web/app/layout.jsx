import "./globals.css";

export const metadata = {
  title: "CybernaNet — Innovate. Secure. Transform.",
  description:
    "CybernaNet helps organizations build, secure and transform their digital environments through integrated technology solutions, cybersecurity, infrastructure engineering, software development and professional training.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
