import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { categories } from "../data/category";
import { useFilms } from "../store/store";
import { mediaTypes } from "../data/mediaType";

export function Header() {
  const { pathname } = useLocation()
  const chageCategory = useFilms(state => state.chageCategory)
  const changeFilmSearch = useFilms(state => state.changeFilmSearch)
  const chageMediaType = useFilms(state => state.chageMediaType)
  const [category, setCategory] = useState<string>('top_rated')
  const [mediaType, setMediaType] = useState<string>('multi')
  const [filmSearch, setFilmSearch] = useState<string>('')
  const isHome = useMemo(() => pathname === '/', [pathname])

  useEffect(() => {changeFilmSearch(filmSearch)}, [changeFilmSearch, filmSearch])
  useEffect(() => {chageCategory(category)}, [chageCategory, category])
  useEffect(() => {chageMediaType(mediaType)}, [chageMediaType, mediaType])

  const handleChangeFilm = (e: ChangeEvent<HTMLInputElement>) => setFilmSearch(e.target.value)
  const handleChangeCategoty = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)
  const handleChangeMediaType = (e: ChangeEvent<HTMLSelectElement>) => setMediaType(e.target.value)

  const isEmpty = useMemo(() => filmSearch.length > 0, [filmSearch])

  console.log(isEmpty);
  

  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-900'}>
      <div className="container mx-auto px-5 py-12">
        <div className="flex justify-between items-center">
          <div>
            <img src='/imdb.svg' alt="imdb" width={200} />
          </div>

          <nav className="flex gap-4">
            <NavLink
              to='/' 
              className={({isActive}) => isActive ? 'text-yellow-400 uppercase font-bold' : 'text-white uppercase font-bold'}
            >
              Home
            </NavLink>
            <NavLink
              to='/favorites' 
              className={({isActive}) => isActive ? 'text-yellow-400 uppercase font-bold' : 'text-white uppercase font-bold'}
            >
              Favorites
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form className="flex mt-10" onSubmit={e => e.preventDefault()}>
            <div className="bg-yellow-400 p-6 rounded-xl shadow-lg w-64 font-bold space-y-4">
              <label htmlFor="film" className="text-black text-lg block">🎬 Film:</label>
              <input 
                type="text" 
                name="film" 
                value={filmSearch}
                onChange={handleChangeFilm}
                placeholder="E.g. Blade Runner" 
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <label htmlFor="media_type" className="text-black">Media Type: </label>
              <select 
                onChange={handleChangeMediaType} 
                name="media_type"
                disabled={!isEmpty}
                className="bg-gray-800 border border-gray-600 p-2 rounded-lg shadow-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              >
                {mediaTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.mediaType}</option>
                ))}
              </select>
              <label htmlFor="category" className="text-black">Category: </label>
              <select 
                onChange={handleChangeCategoty} 
                name="category"
                value={category}
                disabled={isEmpty}
                className="bg-gray-800 border border-gray-600 p-2 rounded-lg shadow-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
          </form>
        )}
      </div>
    </header>
  )
}
