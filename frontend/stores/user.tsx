import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image'

import { API_URL } from '../constants/api'

type UserState = {
  id:string | number | null;
  username:string | null;
  profileURL:string | null;
}

type Actions = {
  setUsername: (username: string | null) => void,
  setProfileURL: (imageURL: string | null) => void,
  setId:(id: string | number | null) => void
}


export const useUserStore = create<UserState & Actions>()(
  persist(
    (set,get) => ({
      id:null,
      username:null,
      profileURL:null,
      setId:(id: string | number | null) => set({id:id}),
      setUsername:(username: string | null) => set({username:username}),
      setProfileURL:async(profile_picture_url: string | null) => {
        await Image.clearDiskCache()
        await Image.clearMemoryCache()
        set({ profileURL: profile_picture_url? profile_picture_url: null})
      }
    }),
    {
      name:'user-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)