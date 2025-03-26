import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation()  
  const isHome = useMemo(() => pathname === '/', [pathname])

  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-900'}>
      <div className="container mx-auto px-5 py-12">
        <div className="flex justify-between items-center">
          <div>
            <img src='/imdb.svg' alt="imdb" width={200} />
          </div>

          <nav className="flex flex-col md:flex-row gap-4">
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
      </div>
    </header>
  )
}
