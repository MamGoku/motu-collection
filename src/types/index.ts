export type MoTUSet = {
  id: string;
  name: string;
  year: number;
  pieces: number | null;
  figures: string[];
  subtheme: string;
  imageUrl?: string;
  exclusive?: string;
};

export type CollectionStatus = "owned" | "wishlist" | "none";
