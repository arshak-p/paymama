import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const head = Bricolage_Grotesque({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});
const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Paymama — Money, sorted into its place.",
  description:
    "Paymama holds your US dollars with the naira value always beside it. Sub-accounts, transfers, exchange, investing and a secure vault in one app.",
};

/* Favicon: src/app/icon.svg is Paymama logo file-04 (Next.js serves it as /icon.svg) */
export const viewport: Viewport = {
  themeColor: "#028CD4",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: decides motion mode, and guarantees content is
// never left hidden if the animation runtime fails to start (5s failsafe).
const bootScript = `(function(d){var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.classList.add(r?'rm':'mo');setTimeout(function(){if(!d.dataset.ready){d.classList.remove('mo','rm')}},5000)})(document.documentElement)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
