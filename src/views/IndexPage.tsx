import { useCallback, useEffect, useState } from "react"
import { useFilms } from "../store/store"
import { Modal } from "../components/Modal";
import { Films } from "../types";
import { FilmCard } from "../components/FilmCard";
import { Pagination } from "../components/Pagination";

export function IndexPage() {
  const fetchFilmsDefault = useFilms(state => state.fetchFilmsDefault)
  const fetchFilmsSearch = useFilms(state => state.fetchFilmsSearch)
  const films = useFilms(state => state.films)
  const category = useFilms(state => state.category)
  const mediaType = useFilms(state => state.mediaType)
  const filmSearch = useFilms(state => state.filmSearch)

  const [selectedFilm, setSelectedFilm] = useState<Films | null>(null)
  const [page, setPage] = useState<number>(1)

  const fetchData = useCallback(async () => {
    if (filmSearch.trim().length > 0) {
      await fetchFilmsSearch(page)
    } else {
      await fetchFilmsDefault(page)
    }
  }, [filmSearch, fetchFilmsSearch, fetchFilmsDefault, page]);

  useEffect(() => {
    fetchData()
  }, [fetchData, category, mediaType]);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-10 my-4">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} setSelectedFilm={setSelectedFilm} />
        ))}
      </div>
      <Modal film={selectedFilm} />
      
      <div className="my-8"> 
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  )
}
