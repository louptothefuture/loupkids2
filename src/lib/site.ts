export const SITE = {
  name: "LOUP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://loupkids.com",
  tagline: "Reach kids anytime — without handing them the internet.",
  description:
    "Loup is the phone before their first smartphone — approved contacts only, no feeds, no algorithms. First 500 for $149 (Save 25%). Loup↔Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo.",
  email: "hi@loupkids.com",
  press: "hi@loupkids.com",
  social: {
    instagram: "https://instagram.com/loupkids",
    tiktok: "https://tiktok.com/@loupkids",
    youtube: "https://youtube.com/@loupkids",
  },
  price: 149,
  compareAtPrice: 199,
  planPrice: 10,
  currency: "USD",
} as const;
