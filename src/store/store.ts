import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Films } from "../types";

type FilmsState = {
  films: Films[];
  category: string;
  filmSearch: string;
  mediaType: string;
  isOpen: boolean;
  fetchFilmsDefault: () => Promise<void>;
  chageCategory: (category: string) => void;
  changeFilmSearch: (filmSearch: string) => void;
  fetchFilmsSearch: () => Promise<void>;
  chageMediaType: (mediaType: string) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useFilms = create<FilmsState>()(
  persist(
    (set, get) => ({
      films: [],
      category: '',
      filmSearch: '',
      mediaType: '',
      isOpen: false,
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
      changeFilmSearch: async (filmSearch) => {
        set({ filmSearch })
      },
      fetchFilmsSearch: async () => {
        try {
          const filmSearch = get().filmSearch.trim()
          const mediaType = get().mediaType
          const url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${import.meta.env.VITE_API_KEY_TMDB}&query=${filmSearch}`
          
          const { data } = await axios.get(url)
          const results = Array.isArray(data.results) ? data.results : []
          set({ films: results })
        } catch (error) {
          console.error(error)
        }
      },
      chageMediaType: async (mediaType) => {
        set({ mediaType })
      },
      openModal: async () => {
        set({ isOpen: true })
      },
      closeModal: async () => {
        set({ isOpen: false })
      }
    }),
  { name: "films-storage" }
))