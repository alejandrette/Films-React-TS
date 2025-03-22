import { useCallback, useEffect, useState } from "react"
import { useFilms } from "../store/store"
import { mediaTypes } from "../data/mediaType"
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Modal } from "./components/Modal";
import { Films } from "../types";

export function IndexPage() {
  const fetchFilmsDefault = useFilms(state => state.fetchFilmsDefault)
  const fetchFilmsSearch = useFilms(state => state.fetchFilmsSearch)
  const films = useFilms(state => state.films)
  const category = useFilms(state => state.category)
  const mediaType = useFilms(state => state.mediaType)
  const filmSearch = useFilms(state => state.filmSearch)
  const openModal = useFilms((state) => state.openModal)

  const [selectedFilm, setSelectedFilm] = useState<Films | null>(null)

  const fetchData = useCallback(async () => {
    if (filmSearch.trim().length > 0) {
      await fetchFilmsSearch()
    } else {
      await fetchFilmsDefault()
    }
  }, [filmSearch, fetchFilmsSearch, fetchFilmsDefault]);

  useEffect(() => {
    fetchData()
  }, [fetchData, category, mediaType]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 gap-10 my-4">
      {films.map(film => (
        <div key={film.id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm max-w-[342px]">
          <a href={`https://image.tmdb.org/t/p/w500${film.poster_path}`} target="_blank">
            <img className="rounded-t-lg w-full" src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt={film.title} />
          </a>
          <div className="p-5">
            <h5 className="text-2xl text-gray-900 dark:text-white font-bold mb-2 tracking-tight truncate">{film.title}</h5>
            <p className="text-gray-700 dark:text-gray-400 font-normal line-clamp-3 mb-3">{film.overview}</p>
            <div className="flex flex-wrap justify-between">
              <div>
                <button
                  onClick={() => {
                    setSelectedFilm(film)
                    openModal()
                  }}
                  className="flex bg-blue-700 rounded-lg text-sm text-white hover:bg-blue-800 items-center px-3 py-2"
                >
                  Read more &nbsp; <FaArrowRightToBracket />
                </button>
              </div>

              {mediaTypes.find(mediaType => mediaType.value === film.media_type) && (
              <div className={`flex items-center px-3 py-1 rounded-lg text-white text-xs font-semibold ${film.media_type === 'movie' ? 'bg-orange-500' : 'bg-purple-500'}`}>
                {mediaTypes.find(mediaType => mediaType.value === film.media_type)?.mediaType}
              </div>
              )}
            </div>
          </div>
        </div>
      ))}
      </div>
      <Modal film={selectedFilm} />
    </div>
  )
}
