import React, { 
  useContext,
  createContext,
  useMemo
} from 'react'

import { useColorScheme } from 'react-native'

import { Colors } from '../constants/Colors'

type ThemeContextType = {
  theme: { 
    colorScheme: 'light' | 'dark',
    colors:{
      background:{
        default: string,
        card:string,
      }
      primary:string,
      tint:string,
      text:string,
      tabBarIcon:string
    }
  }
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if(!context) throw new Error('useThemeContext must be used within a ThemeContextProvider')
  return context
}

type ThemeContextProps = {
  children: React.ReactNode
}

export function ThemeContextProvider({ children }: ThemeContextProps ){
  const scheme = useColorScheme() || 'light'
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