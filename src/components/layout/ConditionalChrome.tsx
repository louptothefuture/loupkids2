"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LoupkidsShell } from "@/components/loupkids/LoupkidsShell";

/** Routes that keep the bold campaign chrome (no Loupkids shell). */
const BOLD_ROUTES = ["/launch", "/legacy"];

function isBoldRoute(pathname: string) {
  return BOLD_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

export function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bold = isBoldRoute(pathname);

  if (bold) {
    const hideLegacyHeader = pathname === "/launch" || pathname === "/story";
    return (
      <>
        {!hideLegacyHeader && <Header />}
        <main className={hideLegacyHeader ? "" : "flex-1"}>{children}</main>
        {!hideLegacyHeader && <Footer />}
        <CartDrawer />
      </>
    );
  }

  return (
    <>
      <LoupkidsShell>{children}</LoupkidsShell>
      <CartDrawer />
    </>
  );
}
