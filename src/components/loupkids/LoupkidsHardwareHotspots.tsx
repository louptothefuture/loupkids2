"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HARDWARE_HOTSPOT_VIEWS,
  type HardwareView,
} from "@/lib/content/hardware-hotspots";

export function LoupkidsHardwareHotspots() {
  const [viewId, setViewId] = useState(HARDWARE_HOTSPOT_VIEWS[0].id);
  const view =
    HARDWARE_HOTSPOT_VIEWS.find((v) => v.id === viewId) ?? HARDWARE_HOTSPOT_VIEWS[0];
  const [activeId, setActiveId] = useState(view.hotspots[0]?.id ?? "");

  useEffect(() => {
    setActiveId(view.hotspots[0]?.id ?? "");
  }, [view]);

  const active = view.hotspots.find((h) => h.id === activeId) ?? view.hotspots[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12">
      <div>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Hardware views"
        >
          {HARDWARE_HOTSPOT_VIEWS.map((v) => {
            const selected = v.id === view.id;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setViewId(v.id)}
                className={`cursor-pointer border px-3.5 py-2 text-sm transition-colors ${
                  selected
                    ? "border-[var(--lk-ink)] bg-[var(--lk-ink)] text-white"
                    : "border-[var(--lk-line)] text-[var(--lk-ink)] hover:border-[var(--lk-ink)]"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 space-y-2" aria-label="Features on this view">
          {view.hotspots.map((h, i) => {
            const selected = h.id === active?.id;
            return (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(h.id)}
                  className={`flex w-full cursor-pointer items-start gap-3 border px-4 py-3.5 text-left transition-colors ${
                    selected
                      ? "border-[var(--lk-ink)] bg-[var(--lk-cream)]"
                      : "border-[var(--lk-line)] hover:border-[var(--lk-ink)]/50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-xs font-medium ${
                      selected
                        ? "bg-[var(--lk-ink)] text-white"
                        : "border border-[var(--lk-line)] text-[var(--lk-muted)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-[var(--lk-ink)]">
                      {h.label}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-[var(--lk-muted)]">
                      {h.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <HotspotStage view={view} activeId={active?.id ?? ""} onSelect={setActiveId} />
    </div>
  );
}

function HotspotStage({
  view,
  activeId,
  onSelect,
}: {
  view: HardwareView;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const active = view.hotspots.find((h) => h.id === activeId);

  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--lk-cream)] shadow-[var(--lk-card-shadow)]">
        <Image
          key={view.src}
          src={view.src}
          alt={view.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />

        {view.hotspots.map((h, i) => {
          const selected = h.id === activeId;
          return (
            <button
              key={h.id}
              type="button"
              aria-label={h.label}
              aria-pressed={selected}
              onClick={() => onSelect(h.id)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span
                className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium shadow-md transition-transform ${
                  selected
                    ? "scale-110 bg-[var(--lk-surface)] text-[var(--lk-ink)] ring-2 ring-[var(--lk-ink)]"
                    : "bg-[var(--lk-ink)] text-white hover:scale-105"
                }`}
              >
                {/* pulse ring when not selected */}
                {!selected ? (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[var(--lk-ink)]/35" />
                ) : null}
                <span className="relative">{i + 1}</span>
              </span>
            </button>
          );
        })}
      </div>

      {active ? (
        <p className="mt-4 rounded-2xl bg-[var(--lk-surface)] px-4 py-3 text-sm leading-snug text-[var(--lk-muted)] shadow-[var(--lk-card-shadow)] lg:hidden">
          <span className="font-medium text-[var(--lk-ink)]">{active.label}. </span>
          {active.body}
        </p>
      ) : null}

      <p className="mt-3 text-xs text-[var(--lk-muted)]">
        Tap a number or a row — prototype for shop/PDP later.
      </p>
    </div>
  );
}
