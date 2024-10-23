import React, { createContext, useContext } from 'react'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { getRefreshToken } from '../utils/authentication'

interface AuthContextType {
  isAuthenticated: boolean | null,
  setIsAuthenticated: (authState:boolean) => void,
  isLoading:boolean,
  login: () => void,
  logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
  const context =  useContext(AuthContext)
  if(!context) throw new Error('useAuthContext should be used inside AuthContextProvider')
  return context
}

interface ContextProp {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: ContextProp) => {
  
  const router = useRouter()
  const [isLoading,setIsLoading] = React.useState<boolean>(true)
  const [isAuthenticated,setIsAuthenticated] = React.useState<boolean | null>(null)
  
  const login = React.useCallback(async() => {
    await SecureStore.setItemAsync('refresh','dummy')
    setIsAuthenticated(true)
    router.replace('(home)/')
  },[isAuthenticated])
  
  const logout = React.useCallback(async() => {
    await SecureStore.deleteItemAsync('refresh')
    setIsAuthenticated(false)
    router.replace('authentication/')
  },[isAuthenticated]) 
  
  
  React.useEffect(() => {
    async function checkAuth(){
      const token = await getRefreshToken()
      setIsAuthenticated(token? true: false)
      setIsLoading(false)
    }
    checkAuth()
  },[])
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      isLoading,
      login,
      logout
    }}>
      { children } 
    </AuthContext.Provider>
  )
}