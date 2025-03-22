import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useFilms } from "../../store/store";
import { Films } from "../../types";

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
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        {/* Contenido del modal */}
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
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
                  className="mt-4 max-w-xs rounded"
                  src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`}
                  alt={film?.title}
                />
              </div>

              <div className="flex flex-wrap justify-between">
                <div>
                  circulo
                </div>

                <div>
                  fav
                </div>

                <div>
                  <button
                    onClick={closeModal}
                    className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
