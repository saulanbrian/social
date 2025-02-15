import React, { createContext, useContext, useState } from "react";
import SearchContextProvider, { SearchContextType } from "./search";
import { SearchItem } from "@/types/search";
import { AnimatedRef, measure, ScrollHandlerProcessed, SharedValue, useAnimatedRef, useAnimatedScrollHandler, useSharedValue, withSpring } from "react-native-reanimated";


type MessageAppContextType = {
  scrollOffsetY:SharedValue<number>;
  headerHeight:number;
  setHeaderHeight:React.Dispatch<React.SetStateAction<number>>;
  scrollHandlerToAnimatedHeader:ScrollHandlerProcessed<Record<string, unknown>>
}

const MessageAppContext = createContext<MessageAppContextType | null>(null)

export const useMessageAppContext = () => {
  const context = useContext(MessageAppContext)
  if(!context) throw new Error('cannot use message app context oustide MessageAppContextProvider')
  return context
} 


const MessageAppContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [headerHeight,setHeaderHeight] = useState(0)
  const scrollOffsetY = useSharedValue(0)
  
  const scrollHandlerToAnimatedHeader = useAnimatedScrollHandler({
    onScroll:(e) => {
      scrollOffsetY.value = e.contentOffset.y
    }
  })

  return (
    <MessageAppContext.Provider value={{ headerHeight, setHeaderHeight,  scrollOffsetY, scrollHandlerToAnimatedHeader }}>
      { children }
    </MessageAppContext.Provider>
  )
}

export default MessageAppContextProvider