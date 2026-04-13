"use client";

import { useMemo, useState } from "react";
import sets from "@/data/sets.json";
import { MoTUSet } from "@/types";
import { SetCard } from "@/components/SetCard";
import { CollectionStats } from "@/components/CollectionStats";
import { FilterBar } from "@/components/FilterBar";
import { useCollection } from "@/hooks/useCollection";

const allSets = sets as MoTUSet[];
const releasedSets = allSets.filter((s) => !s.unreleased);

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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Masters of the Universe
            <span className="block text-lg font-normal text-muted-foreground mt-1">
              Mega Construx · Collection Tracker
            </span>
          </h1>
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
