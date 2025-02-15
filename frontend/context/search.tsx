import { SearchItem } from "@/types/search";
import React, { createContext, useContext, useState } from "react";


export type SearchContextType = {
  searchKey:string | undefined;
  setSearchKey:React.Dispatch<React.SetStateAction<string | undefined>>;
  searchItemPressHandler:(item:SearchItem) => void;
}

type SearchContextProviderProps = {
  searchItemPressHandler:(item:SearchItem) => void;
  children:React.ReactNode
}

const SearchContext = createContext<SearchContextType | null>(null)

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if(!context) throw new Error('cannot use SearchContext outside SearchContextProvider')
  return context 
}


const SearchContextProvider = ({ searchItemPressHandler, children }: SearchContextProviderProps) => {

  const [searchKey,setSearchKey] = useState<string>()

  return (
    <SearchContext.Provider value={{ searchKey, setSearchKey, searchItemPressHandler }}>
      { children }
    </SearchContext.Provider>
  )
}


export default SearchContextProvider;