import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useFilms } from "../store/store"
import { categories } from "../data/category";
import { mediaTypes } from "../data/mediaType";

export default function Form() {
  const chageCategory = useFilms(state => state.chageCategory)
  const changeFilmSearch = useFilms(state => state.changeFilmSearch)
  const chageMediaType = useFilms(state => state.chageMediaType)
  const [category, setCategory] = useState<string>('top_rated')
  const [mediaType, setMediaType] = useState<string>('multi')
  const [filmSearch, setFilmSearch] = useState<string>('')

  const handleChangeFilm = (e: ChangeEvent<HTMLInputElement>) => setFilmSearch(e.target.value)
  const handleChangeCategoty = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)
  const handleChangeMediaType = (e: ChangeEvent<HTMLSelectElement>) => setMediaType(e.target.value)

  useEffect(() => {changeFilmSearch(filmSearch)}, [changeFilmSearch, filmSearch])
  useEffect(() => {chageCategory(category)}, [chageCategory, category])
  useEffect(() => {chageMediaType(mediaType)}, [chageMediaType, mediaType])

  const isEmpty = useMemo(() => filmSearch.length > 0, [filmSearch])  
  return (
    <form className="flex flex-wrap items-center gap-4 mt-10 bg-yellow-400 p-4 rounded-xl shadow-lg" onSubmit={e => e.preventDefault()}>
    {/* Input de búsqueda */}
      <div className="flex flex-col">
        <label htmlFor="film" className="text-black text-lg font-bold">🎬 Film:</label>
        <input 
          type="text" 
          name="film" 
          value={filmSearch}
          onChange={handleChangeFilm}
          placeholder="E.g. Blade Runner" 
          className="bg-gray-800 border border-gray-600 p-2 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 md:w-40"
        />
      </div>
    
      {/* Selector de tipo de media */}
      {isEmpty ? (
        <div className="flex flex-col">
          <label htmlFor="media_type" className="text-black font-bold">📺 Media Type:</label>
          <select 
            onChange={handleChangeMediaType} 
            name="media_type"
            disabled={!isEmpty}
            className="bg-gray-800 border border-gray-600 p-2 rounded-lg shadow-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 md:w-40"
          >
            {mediaTypes.map(type => (
              <option key={type.value} value={type.value}>{type.mediaType}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex flex-col">
          <label htmlFor="category" className="text-black font-bold">🎥 Category:</label>
          <select 
            onChange={handleChangeCategoty} 
            name="category"
            value={category}
            disabled={isEmpty}
            className="bg-gray-800 border border-gray-600 p-2 rounded-lg shadow-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 md:w-40"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      )}
  </form>  
  )
}
