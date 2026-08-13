"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { WaitlistModal } from "./WaitlistModal";

type WaitlistContextValue = {
  openWaitlist: (source?: string) => void;
  closeWaitlist: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("site");

  const openWaitlist = useCallback((src = "site") => {
    setSource(src);
    setOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onAuto = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      openWaitlist(typeof detail === "string" ? detail : "popup");
    };
    window.addEventListener("loup:waitlist-auto", onAuto);
    return () => window.removeEventListener("loup:waitlist-auto", onAuto);
  }, [openWaitlist]);

  const value = useMemo(
    () => ({ openWaitlist, closeWaitlist }),
    [openWaitlist, closeWaitlist],
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistModal open={open} source={source} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return ctx;
}
