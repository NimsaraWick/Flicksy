import { create } from "zustand";

export const useContentStore = create((set) => ({
  contentType: "movie", // always "movie" or "tv"
  setContentType: (type) => set({ contentType: type }),
}));
