"use client";

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

  const save = useCallback((next: CollectionState) => {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const toggleOwned = useCallback(
    (id: string) => {
      save({
        owned: state.owned.includes(id)
          ? state.owned.filter((x) => x !== id)
          : [...state.owned, id],
        wishlist: state.wishlist.filter((x) => x !== id),
      });
    },
    [state, save]
  );

  const toggleWishlist = useCallback(
    (id: string) => {
      save({
        wishlist: state.wishlist.includes(id)
          ? state.wishlist.filter((x) => x !== id)
          : [...state.wishlist, id],
        owned: state.owned.filter((x) => x !== id),
      });
    },
    [state, save]
  );

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
