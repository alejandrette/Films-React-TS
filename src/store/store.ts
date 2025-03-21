import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Films } from "../types";

type FilmsState = {
  films: Films[];
  category: string;
  fetchFilmsDefault: () => Promise<void>;
  chageCategory: (category: string) => void;
  filmSearch: string;
}

export const useFilms = create<FilmsState>()(devtools((set, get) => ({
  films: [],
  category: 'top_rated',
  fetchFilmsDefault: async () => {
    try {
      const category = get().category;
      
      const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${import.meta.env.VITE_API_KEY_TMDB}`
      console.log("Fetching from:", url);
      
      const { data: { results } } = await axios.get(url)
      set({ films: results })
    } catch (error) {
      console.error(error)
    }
  },
  chageCategory: async (category) => {
    set({ category })
  },
  filmSearch: '',
})))