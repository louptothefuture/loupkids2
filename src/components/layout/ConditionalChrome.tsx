"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DevConvertHeader } from "@/components/campaign/DevConvertHeader";
import { DevCampaignFooter } from "@/components/campaign/DevCampaignFooter";
import { DevCampaignHeader } from "@/components/campaign/DevCampaignHeader";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LoupkidsFooter } from "@/components/loupkids/LoupkidsFooter";
import { LoupkidsShell } from "@/components/loupkids/LoupkidsShell";

/** Routes that keep the bold campaign chrome (no Loupkids shell). */
const BOLD_ROUTES = ["/launch", "/legacy", "/dev-home", "/convert"];

function isBoldRoute(pathname: string) {
  return BOLD_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

function isDevCampaign(pathname: string) {
  return (
    pathname === "/dev-home" ||
    pathname.startsWith("/dev-home/") ||
    pathname === "/convert" ||
    pathname.startsWith("/convert/")
  );
}

function isConvertRoute(pathname: string) {
  return pathname === "/convert" || pathname.startsWith("/convert/");
}

export function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bold = isBoldRoute(pathname);

  if (bold) {
    const hideLegacyHeader = pathname === "/launch" || pathname === "/story";
    const HeaderChrome = isConvertRoute(pathname)
      ? DevConvertHeader
      : isDevCampaign(pathname)
        ? DevCampaignHeader
        : Header;
    const FooterChrome = isConvertRoute(pathname)
      ? () => (
          <div className="loupkids-theme">
            <LoupkidsFooter />
          </div>
        )
      : isDevCampaign(pathname)
        ? DevCampaignFooter
        : Footer;
    return (
      <>
        {!hideLegacyHeader && <HeaderChrome />}
        <main className={hideLegacyHeader ? "" : "flex-1"}>{children}</main>
        {!hideLegacyHeader && <FooterChrome />}
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
