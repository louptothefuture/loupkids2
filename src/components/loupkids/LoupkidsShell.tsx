"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LoupkidsFooter } from "./LoupkidsFooter";
import { LoupkidsNav } from "./LoupkidsNav";

export function LoupkidsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="loupkids-theme flex min-h-full flex-col">
      <LoupkidsNav />
      <main className={`flex-1 ${isHome ? "" : "pt-[72px]"}`}>{children}</main>
      {!isHome && <LoupkidsFooter />}
    </div>
  );
}
