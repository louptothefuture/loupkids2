export const SITE = {
  name: "LOUP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://loupkids.com",
  tagline: "Reach your kid anytime — without handing them the internet.",
  description:
    "Loup is the phone before their first smartphone — approved contacts only, no apps, no algorithms. Pre-order yours for $129.",
  email: "hi@loupkids.com",
  press: "hi@loupkids.com",
  social: {
    instagram: "https://instagram.com/loupkids",
    tiktok: "https://tiktok.com/@loupkids",
    youtube: "https://youtube.com/@loupkids",
  },
  price: 129,
  planPrice: 10,
  currency: "USD",
} as const;
