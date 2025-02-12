import { useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ScrollHandlerProcessed, SharedValue, useAnimatedScrollHandler, useSharedValue, withDelay, withSpring } from "react-native-reanimated";


type ProfileLayoutContextType = {
  childrenScrollOffsetY:SharedValue<number>;
  childrenScrollHandler:ScrollHandlerProcessed<Record<string, unknown>>;
  setHeaderHeight:React.Dispatch<React.SetStateAction<number>>;
  headerHeight:number
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
  const [headerHeight,setHeaderHeight] = useState(0)

  return (
    <ProfileLayoutContext.Provider value={{
      childrenScrollOffsetY,
      childrenScrollHandler,
      headerHeight,
      setHeaderHeight
    }}>
      { children }
    </ProfileLayoutContext.Provider>
  )
}

export default ProfileLayoutContextProvider