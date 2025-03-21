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
  changeFilmSearch: (filmSearch: string) => void;
  fetchFilmsSearch: () => Promise<void>;
}

export const useFilms = create<FilmsState>()(devtools((set, get) => ({
  films: [],
  category: '',
  fetchFilmsDefault: async () => {
    try {
      const category = get().category;
      const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${import.meta.env.VITE_API_KEY_TMDB}`
      
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
  changeFilmSearch: async (filmSearch) => {
    set({ filmSearch })
  },
  fetchFilmsSearch: async () => {
    try {
      const filmSearch = get().filmSearch.trim();      
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY_TMDB}&query=${filmSearch}`
      
      const { data: { results } } = await axios.get(url)
      set({ films: results })
    } catch (error) {
      console.error(error)
    }
  },
})))