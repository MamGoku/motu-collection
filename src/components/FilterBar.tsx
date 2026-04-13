"use client";

import { Button } from "@/components/ui/button";

type FilterStatus = "all" | "owned" | "wishlist" | "none";

type Props = {
  status: FilterStatus;
  onStatusChange: (s: FilterStatus) => void;
  year: string;
  onYearChange: (y: string) => void;
  years: number[];
  subtheme: string;
  onSubthemeChange: (s: string) => void;
  subthemes: string[];
};

const STATUS_LABELS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "owned", label: "Owned" },
  { value: "wishlist", label: "Wishlist" },
  { value: "none", label: "Nicht markiert" },
];

export function FilterBar({
  status,
  onStatusChange,
  year,
  onYearChange,
  years,
  subtheme,
  onSubthemeChange,
  subthemes,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex gap-1 flex-wrap" role="group" aria-label="Status filtern">
        {STATUS_LABELS.map((s) => (
          <Button
            key={s.value}
            size="sm"
            variant={status === s.value ? "default" : "outline"}
            onClick={() => onStatusChange(s.value)}
            className="h-8 text-xs"
          >
            {s.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <label htmlFor="year-filter" className="sr-only">
          Jahr filtern
        </label>
        <select
          id="year-filter"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="h-8 rounded-md border border-input bg-card text-foreground px-2 text-xs"
        >
          <option value="">Alle Jahre</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <label htmlFor="subtheme-filter" className="sr-only">
          Subthema filtern
        </label>
        <select
          id="subtheme-filter"
          value={subtheme}
          onChange={(e) => onSubthemeChange(e.target.value)}
          className="h-8 rounded-md border border-input bg-card text-foreground px-2 text-xs"
        >
          <option value="">Alle Subthemen</option>
          {subthemes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
