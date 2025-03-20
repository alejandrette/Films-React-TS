import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-slate-900">
      <div className="mx-auto container px-5 py-16">
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
      </div>
    </header>
  )
}
