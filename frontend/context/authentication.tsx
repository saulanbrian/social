import React, { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'expo-router'

import * as SecureStore from 'expo-secure-store'

import { jwtDecode, } from 'jwt-decode'
import { CustomJwtTokenPayload } from '../utils/authentication'
 
import { getRefreshToken, refreshToken } from '../utils/authentication'

import * as SplashScreen from 'expo-splash-screen'

import { API_URL } from '@/constants/api'
import { useGetCurrentUser } from '@/api/queries/user'


type LoginProps = {
  access:string,
  refresh:string
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (authState:boolean) => void;
  isLoading:boolean;
  login: ({access,refresh}:LoginProps) => void;
  logout: () => void;
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
  
  const [isLoading,setIsLoading] = React.useState<boolean>(true)
  const [isAuthenticated,setIsAuthenticated] = React.useState<boolean>(false)

  const router = useRouter()
  const { status } = useGetCurrentUser({ enabled: isAuthenticated })


  useEffect(() => {
    async function authenticate(){
      const token = await getRefreshToken()
      setIsAuthenticated(token? true: false)
    }
    authenticate()
  },[])


  useEffect(() => {
    if(status === 'success') setIsLoading(false)
  },[status])

  
  const login = React.useCallback(async({access,refresh}: LoginProps) => {

    await SecureStore.setItemAsync('access',access)
    await SecureStore.setItemAsync('refresh',refresh)

    const decodedToken: CustomJwtTokenPayload = jwtDecode(access)
    setIsAuthenticated(true)

    router.replace('/(tabs)/feed')
  },[isAuthenticated])
  
  
  const logout = React.useCallback(async() => {

    await SecureStore.deleteItemAsync('refresh')
    await SecureStore.deleteItemAsync('access')

    setIsAuthenticated(false)
    
    router.replace({pathname:'/authentication'})
  },[isAuthenticated]) 
  

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