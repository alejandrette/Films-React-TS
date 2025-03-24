import { useQuery } from "@tanstack/react-query"
import { Dispatch } from "react"
import { useFilms } from "../store/store";
import { PulseLoader } from "react-spinners";

type PaginationProps = {
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}

export function Pagination({ page, setPage }: PaginationProps){
  const fetchFilmsDefault = useFilms(state => state.fetchFilmsDefault)
  const totalPages = useFilms(state => state.totalPages)
  const { isLoading, isError } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchFilmsDefault(page)
  })

  if(isLoading) return <PulseLoader color="#9ca3af" />
  if(isError) return <p>Error</p>

  return (
    <>
      <button 
        disabled={page === 1} 
        onClick={() => setPage(page - 1)} 
        className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:bg-blue-800"
      >
        Previous
      </button>

      <span className="text-lg font-semibold text-gray-600 mx-2">
        Page {page} of {totalPages}
      </span>

      <button 
        disabled={page === totalPages} 
        onClick={() => setPage(page + 1)} 
        className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:bg-blue-800"
      >
        Next
      </button>
    </>
  )
}
