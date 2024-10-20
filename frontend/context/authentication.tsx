import React, { createContext, useContext } from 'react'
import { useRouter } from 'expo-router'

interface AuthContextType {
  isAuthenticated: boolean,
  setIsAuthenticated: (authState:boolean) => void,
  login: () => void,
  logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

interface ContextProp {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: ContextProp) => {
  
  const router = useRouter()
  const [isAuthenticated,setIsAuthenticated] = React.useState<boolean | null>(false)
  
  const login = React.useCallback(() => {
    setIsAuthenticated(true)
    router.replace('(home)')
  },[isAuthenticated])
  
  const logout = React.useCallback(() => {
    setIsAuthenticated(true)
    router.replace('(authentication)')
  },[isAuthenticated]) 
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      login,
      logout
    }}>
      { children } 
    </AuthContext.Provider>
  )
}