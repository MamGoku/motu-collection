"use client";

import { useMemo, useState } from "react";
import sets from "@/data/sets.json";
import { MoTUSet } from "@/types";
import { SetCard } from "@/components/SetCard";
import { CollectionStats } from "@/components/CollectionStats";
import { FilterBar } from "@/components/FilterBar";
import { useCollection } from "@/hooks/useCollection";

const allSets = sets as MoTUSet[];
const releasedSets = allSets.filter((s) => !s.unreleased && s.collectible !== false);

export default function Home() {
  const { owned, wishlist, toggleOwned, toggleWishlist, getStatus, loaded } = useCollection();
  const [statusFilter, setStatusFilter] = useState<"all" | "owned" | "wishlist" | "none">("all");
  const [yearFilter, setYearFilter] = useState("");
  const [subthemeFilter, setSubthemeFilter] = useState("");

  const years = useMemo(
    () => [...new Set(allSets.map((s) => s.year))].sort((a, b) => a - b),
    []
  );
  const subthemes = useMemo(
    () => [...new Set(allSets.map((s) => s.subtheme))].sort(),
    []
  );

  const filtered = useMemo(() => {
    return allSets.filter((s) => {
      if (yearFilter && s.year !== Number(yearFilter)) return false;
      if (subthemeFilter && s.subtheme !== subthemeFilter) return false;
      if (statusFilter === "owned" && !owned.includes(s.id)) return false;
      if (statusFilter === "wishlist" && !wishlist.includes(s.id)) return false;
      if (statusFilter === "none" && (owned.includes(s.id) || wishlist.includes(s.id))) return false;
      return true;
    });
  }, [yearFilter, subthemeFilter, statusFilter, owned, wishlist]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="border-b border-white/20 pb-5">
          <h1
            className="text-4xl sm:text-5xl font-black tracking-wider uppercase text-white"
            style={{
              fontFamily: "var(--font-cinzel)",
              textShadow: "2px 2px 0 oklch(0.55 0.22 30), 0 0 20px oklch(0.72 0.19 42 / 60%)",
            }}
          >
            Masters of the Universe
          </h1>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/60 mt-2">
            Mega Construx &nbsp;·&nbsp; Collection Tracker
          </p>
        </div>

        <CollectionStats
          total={releasedSets.length}
          owned={loaded ? owned.filter((id) => releasedSets.some((s) => s.id === id)).length : 0}
          wishlist={loaded ? wishlist.filter((id) => releasedSets.some((s) => s.id === id)).length : 0}
        />

        <FilterBar
          status={statusFilter}
          onStatusChange={setStatusFilter}
          year={yearFilter}
          onYearChange={setYearFilter}
          years={years}
          subtheme={subthemeFilter}
          onSubthemeChange={setSubthemeFilter}
          subthemes={subthemes}
        />

        <p className="text-sm text-muted-foreground">
          {filtered.length} von {allSets.length} Sets ({releasedSets.length} erschienen)
        </p>

        {loaded ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((set) => (
              <SetCard
                key={set.id}
                set={set}
                status={getStatus(set.id)}
                onToggleOwned={() => toggleOwned(set.id)}
                onToggleWishlist={() => toggleWishlist(set.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {Array.from({ length: allSets.length }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
