import React, { createContext, useContext, useState } from "react";
import { ScrollHandlerProcessed, SharedValue, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";


type ProfileLayoutContextType = {
  childrenScrollOffsetY:SharedValue<number>;
  childrenScrollHandler:ScrollHandlerProcessed<Record<string, unknown>>;
}

const ProfileLayoutContext = createContext<ProfileLayoutContextType | null>(null)

export const useProfileLayoutContext = () => {
  const context = useContext(ProfileLayoutContext)
  if(!context) throw new Error('ProfileLayoutContext can only be used inside it\s provider')
  return context
}


const ProfileLayoutContextProvider = ({children}:{ children: React.ReactNode}) => {

  const childrenScrollOffsetY = useSharedValue(0)
  const childrenScrollHandler = useAnimatedScrollHandler({
    onScroll:(e) => {
      childrenScrollOffsetY.value = e.contentOffset.y
    }
  })

  return (
    <ProfileLayoutContext.Provider value={{
      childrenScrollOffsetY,
      childrenScrollHandler,
    }}>
      { children }
    </ProfileLayoutContext.Provider>
  )
}

export default ProfileLayoutContextProvider