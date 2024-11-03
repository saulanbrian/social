import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../constants/api'

type UserState = {
  username:string | null;
  profileURL:string | null
}

type Actions = {
  setUsername:(username:string) => void,
  setProfileURL:(imageURL:string) => void,
}

const actions = (set) => ({
  setUsername:(username:string) => {
    set({username:username})
  },
  setProfileURL:(imageURL:string) => {
    set({profileURL: API_URL + imageURL})
  }
})


export const useUserStore = create<UserState & Actions>()(
  persist(
    (set,get) => ({
      username:null,
      profileURL:null,
      ...actions(set)
    }),
    {
      name:'user-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)