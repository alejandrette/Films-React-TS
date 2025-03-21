import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { categories } from "../../data/category";
import { useFilms } from "../../store/store";

export function Header() {
  const { pathname } = useLocation()
  const chageCategory = useFilms(state => state.chageCategory)
  const changeFilmSearch = useFilms(state => state.changeFilmSearch)
  const [category, setCategory] = useState<string>('top_rated')
  const [filmSearch, setFilmSearch] = useState<string>('')
  const isHome = useMemo(() => pathname === '/', [pathname])

  useEffect(() => {changeFilmSearch(filmSearch)}, [changeFilmSearch, filmSearch])
  useEffect(() => {chageCategory(category)}, [chageCategory, category])

  const handleChangeFilm = (e: ChangeEvent<HTMLInputElement>) => setFilmSearch(e.target.value)
  const handleChangeCategoty = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)

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
          <form className="flex mt-10">
            <div className="bg-yellow-400 p-6 rounded-xl shadow-lg w-64 font-bold space-y-4">
              <label htmlFor="film" className="text-black text-lg block">🎬 Film:</label>
              <input 
                type="text" 
                name="film" 
                onChange={handleChangeFilm}
                placeholder="E.g. Blade Runner" 
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-black rounded-md text-white w-full duration-300 hover:bg-gray-800 py-2 transition">
                🔍 Search
              </button>
            </div>
          </form>
        )}
        <div className="bg-yellow-400 p-6 rounded-xl shadow-lg w-48 font-bold space-y-4 mt-4 text-black">
          <label htmlFor="category">Choose Category: </label>
          <select 
            onChange={handleChangeCategoty} 
            name="category"
            value={category}
            className="mt-4 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 border-gray-600 text-white"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
