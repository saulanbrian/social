import React, { createContext, useContext } from 'react'
import { useRouter } from 'expo-router'

import * as SecureStore from 'expo-secure-store'
import { useUserStore } from '../stores/user'

import { jwtDecode, } from 'jwt-decode'
import { CustomJwtTokenPayload } from '../utils/authentication'
 
import { getRefreshToken, refreshToken } from '../utils/authentication'

import * as SplashScreen from 'expo-splash-screen'

import { API_URL } from '@/constants/api'


type LoginProps = {
  access:string,
  refresh:string
}

interface AuthContextType {
  isAuthenticated: boolean | null;
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
  const [isAuthenticated,setIsAuthenticated] = React.useState<boolean | null>(null)
  const router = useRouter()
  const { setProfileURL, setUsername, setId } = useUserStore()

  
  const login = React.useCallback(async({access,refresh}: LoginProps) => {

    await SecureStore.setItemAsync('access',access)
    await SecureStore.setItemAsync('refresh',refresh)

    const decodedToken: CustomJwtTokenPayload = jwtDecode(access)

    setId(decodedToken.id)
    setUsername(decodedToken.username)
    if (decodedToken.profile_picture != null) {
      console.log(decodedToken.profile_picture)
      setProfileURL( API_URL + decodedToken.profile_picture)
    }

    setIsAuthenticated(true)
    router.replace('/(tabs)/feed')
  },[isAuthenticated])
  
  
  const logout = React.useCallback(async() => {

    await SecureStore.deleteItemAsync('refresh')
    await SecureStore.deleteItemAsync('access')

    setUsername(null)
    setProfileURL(null)

    setIsAuthenticated(false)
    router.replace({pathname:'/authentication'})
  },[isAuthenticated]) 
  
  
  React.useEffect(() => {
    async function authenticate(){
      const token = await getRefreshToken()
      setIsAuthenticated(token? true: false)
      setIsLoading(false)
    }
    authenticate()
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