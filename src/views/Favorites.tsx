import { useState } from "react"
import { useFilms } from "../store/store"
import { Films } from "../types"
import { Modal } from "../components/Modal"
import { FilmCard } from "../components/FilmCard"

export function Favorites() {
  const favorites = useFilms(state => state.favorites)
  const [selectedFilm, setSelectedFilm] = useState<Films | null>(null)

  return (
    <div className="flex flex-col items-center">
      {favorites.length <= 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg font-semibold text-gray-600">There are no movies in favorites</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-10 my-4">
          {favorites.map((film) => (
            <FilmCard key={film.id} film={film} setSelectedFilm={setSelectedFilm} />
          ))}
        </div>
      )}
      <Modal film={selectedFilm} />
    </div>
  )
}
