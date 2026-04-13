import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "motu-collection";

type CollectionState = {
  owned: string[];
  wishlist: string[];
};

export function useCollection() {
  const [state, setState] = useState<CollectionState>({ owned: [], wishlist: [] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const toggleOwned = useCallback((id: string) => {
    setState((prev) => {
      const next: CollectionState = {
        owned: prev.owned.includes(id)
          ? prev.owned.filter((x) => x !== id)
          : [...prev.owned, id],
        wishlist: prev.wishlist.filter((x) => x !== id),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setState((prev) => {
      const next: CollectionState = {
        wishlist: prev.wishlist.includes(id)
          ? prev.wishlist.filter((x) => x !== id)
          : [...prev.wishlist, id],
        owned: prev.owned.filter((x) => x !== id),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getStatus = useCallback(
    (id: string) => {
      if (state.owned.includes(id)) return "owned" as const;
      if (state.wishlist.includes(id)) return "wishlist" as const;
      return "none" as const;
    },
    [state]
  );

  return { owned: state.owned, wishlist: state.wishlist, toggleOwned, toggleWishlist, getStatus, loaded };
}
