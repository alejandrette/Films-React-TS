import { useEffect } from "react"
import { useFilms } from "../store/store"

export function IndexPage() {
  const fetchFilmsDefault = useFilms(state => state.fetchFilmsDefault)
  const films = useFilms(state => state.films)

  useEffect(() => {fetchFilmsDefault()}, [fetchFilmsDefault])

  return (
    <div>
      {films.map(film => (
        <div key={film.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href={`https://image.tmdb.org/t/p/w500${film.poster_path}`} target="_blank">
                <img className="rounded-t-lg" src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
            </a>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{film.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{film.overview}</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
      ))}
    </div>
  )
}
