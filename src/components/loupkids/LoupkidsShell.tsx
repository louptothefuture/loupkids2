"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LoupkidsFooter } from "./LoupkidsFooter";
import { LoupkidsNav } from "./LoupkidsNav";
import { LoupkidsStickyCta } from "./conversion/LoupkidsStickyCta";
import { WaitlistProvider } from "./waitlist/WaitlistProvider";

export function LoupkidsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <WaitlistProvider>
      <div className="loupkids-theme flex min-h-full flex-col">
        <a href="#main" className="lk-skip">
          Skip to content
        </a>
        <LoupkidsNav />
        <main id="main" className="lk-main flex-1">
          {children}
        </main>
        {!isHome && <LoupkidsFooter />}
        <LoupkidsStickyCta />
      </div>
    </WaitlistProvider>
  );
}
