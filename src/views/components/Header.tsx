import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation()
  
  const isHome = useMemo(() => pathname === '/', [pathname]) 

  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-900'}>
      <div className="container mx-auto px-5 py-16">
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
            <div className="p-6 bg-yellow-400 w-64 font-bold rounded-xl shadow-lg space-y-4">
              <label htmlFor="film" className="block text-black text-lg">🎬 Film:</label>
              <input 
                type="text" 
                name="film" 
                placeholder="E.g. Blade Runner" 
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                🔍 Search
              </button>
            </div>
          </form>        
        )}
      </div>
    </header>
  )
}
