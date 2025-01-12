import { Post } from "@/types/post";
import { SearchItem } from "@/types/search";
import User from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type SearchStore = {
  history:SearchItem[];
  addToHistory:(item: SearchItem ) => void;
  clearHistory:() => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set,get) => ({
      history:[],
      addToHistory:(item: SearchItem ) => {
        set((state) => ({ history: [item, ...state.history]}))
      },
      clearHistory:() => { set(state => ({ history: [] }))}
    }),
    {
      name:'search-storage',
      storage:createJSONStorage(() => AsyncStorage)
    }
  )    
)
