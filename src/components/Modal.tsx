import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useFilms } from "../store/store";
import { Films } from "../types";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaHeart } from "react-icons/fa";
import 'react-circular-progressbar/dist/styles.css'

type ModaProps= {
  film?: Films | null;
}

export function Modal({ film }: ModaProps) {
  const isOpen = useFilms((state) => state.isOpen);
  const closeModal = useFilms((state) => state.closeModal);
  const addToFavorite = useFilms((state) => state.addToFavorite);
  const removeToFavorite = useFilms((state) => state.removeToFavorite);
  const favorites = useFilms((state) => state.favorites);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!film) return null

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Fondo oscuro del modal */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-black bg-opacity-50 fixed inset-0" />
        </Transition.Child>

        {/* Contenido del modal */}
        <div className="flex justify-center fixed inset-0 items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="align-middle bg-gray-800 p-6 rounded-lg shadow-xl text-left w-full max-w-md overflow-hidden transform transition-all">
              <Dialog.Title as="h2" className="text-xl font-bold">
                {film?.title}
              </Dialog.Title>

                <p className="text-gray-600 mr-2">
                  {isDescriptionExpanded
                    ? film?.overview
                    : `${film?.overview?.slice(0, 120)}... `}
                  <button
                    onClick={toggleDescription}
                    className="text-blue-500"
                  >
                    {isDescriptionExpanded ? "Show less" : "Learn more"}
                  </button>
                </p>

              <div className="flex justify-center w-full">
                <img
                  className="rounded max-w-xs mt-4"
                  src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`}
                  alt={film?.title}
                />
              </div>

              <div className="flex flex-wrap justify-between mt-5">
                <div style={{ position: "relative", width: 60, height: 60 }}>
                  <svg style={{ position: "absolute", width: 0, height: 0 }}>
                    <defs>
                    <linearGradient id="gradientProgress" x1="50%" y1="0%" x2="50%" y2="120%">
                      <stop offset="0%" stopColor="#991b1b" /> {/* Rojo */}
                      <stop offset="40%" stopColor="#15803d" /> {/* Verde */}
                      <stop offset="60%" stopColor="#0369a1" /> {/* Azul */}
                      <stop offset="90%" stopColor="#a855f7" /> {/* Morado */}
                    </linearGradient>
                    </defs>
                  </svg>
                  <CircularProgressbar
                    value={film.vote_average}
                    text={`${film.vote_average.toFixed(2)}%`}
                    maxValue={10}
                    circleRatio={0.75}
                    styles={buildStyles({
                      pathColor: "url(#gradientProgress)",
                      trailColor: "#F5F5F5",
                      textColor: "#fff",
                      rotation: 1 / 2 + 1 / 8,
                    })}
                  />
                </div>

                <div className="mt-2">
                  {favorites.some(f => f.id === film.id) ? (
                    <button
                      onClick={() => removeToFavorite(film)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all"
                    >
                      Remove <FaHeart className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={() => addToFavorite(film)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all"
                    >
                      Add <FaHeart className="text-red-500 group-hover:text-white transition-all" />
                    </button>
                  )}
                </div>

                <div>
                  <button
                    onClick={closeModal}
                    className="bg-red-600 rounded text-white w-full hover:bg-red-700 mt-2 px-4 py-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
