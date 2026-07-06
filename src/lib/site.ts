export const SITE = {
  name: "LOUP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://loupkids.com",
  tagline: "Reach your kid anytime — without handing them the internet.",
  description:
    "Loup is the phone before their first smartphone — approved contacts only, no apps, no algorithms. Reserve yours for $149.",
  email: "hello@loupkids.com",
  press: "press@loupkids.com",
  social: {
    instagram: "https://instagram.com/loupkids",
    tiktok: "https://tiktok.com/@loupkids",
    youtube: "https://youtube.com/@loupkids",
  },
  price: 149,
  planPrice: 10,
  currency: "USD",
} as const;
