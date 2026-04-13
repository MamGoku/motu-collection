type Props = {
  total: number;
  owned: number;
  wishlist: number;
};

export function CollectionStats({ total, owned, wishlist }: Props) {
  const pct = total > 0 ? Math.round((owned / total) * 100) : 0;
  const remaining = Math.max(0, total - owned - wishlist);

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-primary inline-block" aria-hidden="true" />
        <span>
          <strong>{owned}</strong> von <strong>{total}</strong> owned
          <span className="text-muted-foreground ml-1">({pct}%)</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" aria-hidden="true" />
        <span>
          <strong>{wishlist}</strong> auf Wishlist
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-muted-foreground inline-block" aria-hidden="true" />
        <span>
          <strong>{remaining}</strong> noch offen
        </span>
      </div>

      <div
        className="w-full h-2 rounded-full bg-muted overflow-hidden"
        role="progressbar"
        aria-valuenow={owned}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Sammlungsfortschritt"
      >
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
