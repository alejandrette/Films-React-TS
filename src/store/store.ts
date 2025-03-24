import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Films } from "../types";

type FilmsState = {
  films: Films[];
  totalPages: number,
  category: string;
  filmSearch: string;
  mediaType: string;
  isOpen: boolean;
  fetchFilmsDefault: (page: number) => Promise<void>;
  chageCategory: (category: string) => void;
  changeFilmSearch: (filmSearch: string) => void;
  fetchFilmsSearch: (page: number) => Promise<void>;
  chageMediaType: (mediaType: string) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useFilms = create<FilmsState>()(
  persist(
    (set, get) => ({
      films: [],
      totalPages: 1,
      category: '',
      filmSearch: '',
      mediaType: '',
      isOpen: false,
      fetchFilmsDefault: async (page) => {
        try {
          const category = get().category
          const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${import.meta.env.VITE_API_KEY_TMDB}&page=${page}`

          const { data } = await axios.get(url)
          const results = Array.isArray(data.results) ? data.results : []
          set({ films: results, totalPages: data.total_pages })
          return data
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
      fetchFilmsSearch: async (page) => {
        try {
          const filmSearch = get().filmSearch.trim()
          const mediaType = get().mediaType
          const url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${import.meta.env.VITE_API_KEY_TMDB}&query=${filmSearch}&page=${page}`
          
          const { data } = await axios.get(url)
          const results = Array.isArray(data.results) ? data.results : []
          set({ films: results, totalPages: data.total_pages })
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