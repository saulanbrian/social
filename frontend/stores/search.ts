import { Post } from "@/types/post";
import User from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export type HistoryItem = 
  | 
    {
      type:'post';
      item:Post
    }
  | 
    {
      type:'user';
      item:User
    }

type SearchStore = {
  history:HistoryItem[];
  addToHistory:(item: HistoryItem ) => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set,get) => ({
      history:[],
      addToHistory:(item: HistoryItem ) => {
        set((state) => { 
          if(!state.history.some(historyItem => historyItem === item)){
            return ({ history: [item, ...state.history]})
          }else return state
        })
      }
    }),
    {
      name:'search-storage',
      storage:createJSONStorage(() => AsyncStorage)
    }
  )    
)
