import React from 'react'
import { Slot, useRouter } from 'expo-router'

import { AuthContextProvider, useAuthContext } from '../context/authentication'
import { ThemeContextProvider } from '../context/theme'

function InitialLayout(){
  
  const { isAuthenticated, isLoading } = useAuthContext()
  const router = useRouter()
  
  React.useEffect(() => {
    if(!isLoading){
      router.replace(isAuthenticated? '(home)':'authentication')
    }
  },[isLoading])
  
  return (
      <Slot />
  )
}


export default function RootLayout(){
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <InitialLayout />
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}