import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Films } from "../types";

type FilsmSatate = {
  films: Films[];
  fetchFilmsDefault: () => Promise<void>;
  filmSearch: string;
}

export const useFilms = create<FilsmSatate>()(devtools((set) => ({
  films: [],
  fetchFilmsDefault: async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY_TMDB}`
      const { data: { results } } = await axios.get(url)
      set({ films: results })
    } catch (error) {
      console.error(error)
    }
  },
  filmSearch: '',
})))