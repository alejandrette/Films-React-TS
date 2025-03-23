import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useFilms } from "../store/store";
import { Films } from "../types";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

type ModaProps= {
  film?: Films | null;
}

export function Modal({ film }: ModaProps) {
  const isOpen = useFilms((state) => state.isOpen);
  const closeModal = useFilms((state) => state.closeModal);
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

              <div className="flex flex-wrap justify-between">
                <div>
                <CircularProgressbar
                  value={film.vote_average}
                  maxValue={10}
                  styles={buildStyles({
                    pathColor: `${film.vote_average === 100 ? '#be185d' : '#14b8a6'}`,
                    trailColor: '#F5F5F5',
                    textColor: `${film.vote_average === 100 ? '#be185d' : '#14b8a6'}`,
                  })}
                  text={`${film.vote_average.toFixed(2)}%`}
                />
                </div>

                <div>
                  fav
                </div>

                <div>
                  <button
                    onClick={closeModal}
                    className="bg-red-500 rounded text-white w-full hover:bg-red-600 mt-4 px-4 py-2"
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
