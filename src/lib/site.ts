export const SITE = {
  name: "LOUP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://loupkids.com",
  tagline: "Phones for the anti-screen age.",
  description:
    "Loup is the escape hatch from the smartphone trap. The phone before their first smartphone — approved contacts only, no apps, no algorithms, no compromise.",
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
