"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideChrome =
    pathname === "/" || pathname === "/story" || pathname === "/shop" || pathname.startsWith("/shop/");

  return (
    <>
      {!hideChrome && <Header />}
      <main className={hideChrome ? "" : "flex-1"}>{children}</main>
      {!hideChrome && <Footer />}
      <CartDrawer />
    </>
  );
}
