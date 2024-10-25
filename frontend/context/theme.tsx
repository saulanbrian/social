import React, { 
  useContext,
  createContext,
  useMemo
} from 'react'

import { useColorScheme } from 'react-native'

import { Colors } from '../constants/Colors'

type ThemeContextType = {
  theme: { colorScheme: 'light' | 'dark', colors }
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = () => {
  return useContext(ThemeContext)
}

export function ThemeContextProvider({children}:React.ReactNode){
  const scheme = useColorScheme()
  const theme = useMemo(() => ({
    colorScheme:scheme,
    colors:scheme === 'light'? Colors.light: Colors.dark
  }),[scheme])
  
  return (
    <ThemeContext.Provider value={{
      theme,
    }}>
      { children } 
    </ThemeContext.Provider>
  )
}