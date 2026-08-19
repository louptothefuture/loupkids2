import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./loupkids-theme.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { CookieBanner } from "@/components/CookieBanner";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

const atkinson = localFont({
  src: [
    {
      path: "../../public/fonts/AtkinsonHyperlegible-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AtkinsonHyperlegible-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-atkinson",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Loup | Phones for the Anti-Screen Age",
    template: "%s | LOUP",
  },
  description:
    "Loup is the phone before their first smartphone — approved contacts only, no feeds, no algorithms. First 500 for $129 (Save 33%). Loup↔Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo.",
  keywords: [
    "smartphone alternative for kids",
    "kids phone no screen",
    "LOUP phone",
    "first phone for kids",
  ],
  openGraph: {
    type: "website",
    siteName: "LOUP",
    url: SITE.url,
    images: [{ url: "/images/product/loup-red-hero.jpg", width: 1200, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${atkinson.variable} h-full antialiased`}>
      <body className={`${atkinson.className} flex min-h-full flex-col`}>
        <OrganizationJsonLd />
        <CartProvider>
          <ConditionalChrome>{children}</ConditionalChrome>
        </CartProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
