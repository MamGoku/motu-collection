type Props = {
  total: number;
  owned: number;
  wishlist: number;
};

export function CollectionStats({ total, owned, wishlist }: Props) {
  const pct = total > 0 ? Math.round((owned / total) * 100) : 0;

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
        <span>
          <strong>{owned}</strong> von <strong>{total}</strong> owned
          <span className="text-muted-foreground ml-1">({pct}%)</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
        <span>
          <strong>{wishlist}</strong> auf Wishlist
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-muted-foreground inline-block" />
        <span>
          <strong>{total - owned - wishlist}</strong> noch offen
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
