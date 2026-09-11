import type { RaiseCompareGridTile } from "@/lib/content/loupkids-raise";

type Props = {
  tiles: readonly RaiseCompareGridTile[];
};

function Tile({ tile }: { tile: RaiseCompareGridTile }) {
  const dark = tile.dark;

  return (
    <div
      className={`px-6 py-7 sm:px-7 sm:py-8 ${dark ? "bg-[#111] text-white" : "bg-[#f0f0f0] text-[#111]"}`}
    >
      <p
        className={`text-[11px] uppercase tracking-[0.12em] ${dark ? "text-[#666]" : "text-[#888]"}`}
      >
        {tile.eyebrow}
      </p>
      <p className="lk-display mt-2.5 text-[clamp(2rem,5vw,2.625rem)] font-medium leading-none">
        {tile.stat}
      </p>
      <div
        className={`mt-2 space-y-0 text-xs leading-snug ${dark ? "text-[#555]" : "text-[#888]"}`}
      >
        {tile.sub.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export function RaiseCompareGrid({ tiles }: Props) {
  return (
    <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
      {tiles.map((tile) => (
        <Tile key={tile.eyebrow} tile={tile} />
      ))}
    </div>
  );
}
