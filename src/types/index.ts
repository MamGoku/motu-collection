export type MoTUSet = {
  id: string;
  name: string;
  year: number;
  pieces: number | null;
  figures: string[];
  subtheme: string;
  imageUrl?: string;
  exclusive?: string;
  unreleased?: boolean;
  collectible?: boolean;
  note?: string;
};

export type CollectionStatus = "owned" | "wishlist" | "none";
