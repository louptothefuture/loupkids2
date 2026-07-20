import type { Metadata } from "next";
import { Inconsolata, Inter, Rubik } from "next/font/google";
import "./globals.css";
import "./loupkids-theme.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { Analytics } from "@/components/Analytics";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const inconsolata = Inconsolata({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Loup | Phones for the Anti-Screen Age",
    template: "%s | LOUP",
  },
  description:
    "Loup is the phone before their first smartphone — approved contacts only, no apps, no feed. Pre-order yours for $129.",
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
    <html
      lang="en"
      className={`${rubik.variable} ${inter.variable} ${inconsolata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationJsonLd />
        <CartProvider>
          <ConditionalChrome>{children}</ConditionalChrome>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
