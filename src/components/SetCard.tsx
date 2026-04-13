"use client";

import { useState } from "react";
import Image from "next/image";
import { MoTUSet } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

type Props = {
  set: MoTUSet;
  status: "owned" | "wishlist" | "none";
  onToggleOwned: () => void;
  onToggleWishlist: () => void;
};

const PLACEHOLDER = "https://placehold.co/300x300/1a1a2e/e0e0e0?text=MOTU";

export function SetCard({ set, status, onToggleOwned, onToggleWishlist }: Props) {
  const [imgSrc, setImgSrc] = useState(set.imageUrl || PLACEHOLDER);

  const borderColor =
    status === "owned"
      ? "border-green-500"
      : status === "wishlist"
      ? "border-yellow-400"
      : "border-transparent";

  return (
    <Card
      className={`border-2 ring-0 ${borderColor} transition-colors duration-200 flex flex-col overflow-hidden bg-card`}
    >
      <div className="relative aspect-square bg-muted">
        <Image
          src={imgSrc}
          alt={set.name}
          fill
          className="object-contain p-2"
          unoptimized
          onError={() => {
            if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER);
          }}
        />
        {set.exclusive && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {set.exclusive}
          </span>
        )}
        {set.unreleased && (
          <span className="absolute top-2 left-2 bg-red-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            Unreleased
          </span>
        )}
      </div>

      <CardContent className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <p className="font-semibold text-sm leading-tight">{set.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {set.id} · {set.year}
            {set.pieces ? ` · ${set.pieces} Teile` : ""}
            {set.exclusive ? ` · ${set.exclusive}` : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {set.subtheme}
          </Badge>
        </div>

        {set.figures.length > 0 && (
          <p className="text-[11px] text-muted-foreground leading-snug">
            {set.figures.join(", ")}
          </p>
        )}

        <div className="flex gap-1.5 mt-auto pt-1">
          <Button
            size="sm"
            variant={status === "owned" ? "default" : "outline"}
            aria-pressed={status === "owned"}
            disabled={set.unreleased}
            className={`flex-1 h-7 text-xs gap-1 ${
              status === "owned" ? "bg-green-600 hover:bg-green-700 text-white" : ""
            }`}
            onClick={onToggleOwned}
          >
            <Check className="w-3 h-3" aria-hidden="true" />
            Owned
          </Button>
          <Button
            size="sm"
            variant={status === "wishlist" ? "default" : "outline"}
            aria-pressed={status === "wishlist"}
            disabled={set.unreleased}
            className={`flex-1 h-7 text-xs gap-1 ${
              status === "wishlist" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""
            }`}
            onClick={onToggleWishlist}
          >
            <Star className="w-3 h-3" aria-hidden="true" />
            Wishlist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
