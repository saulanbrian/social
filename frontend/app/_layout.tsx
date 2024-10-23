import React from 'react'
import { Slot, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthContextProvider, useAuthContext } from '../context/authentication'


function InitialLayout(){
  
  const { isAuthenticated, isLoading } = useAuthContext()
  const router = useRouter()
  
  React.useEffect(() => {
    if(!isLoading){
      router.replace(isAuthenticated? '(home)':'authentication')
    }
  },[isLoading])
  
  return (
    <SafeAreaView style={{flex:1}}>
      <Slot />
    </SafeAreaView>
  )
}


export default function RootLayout(){
  return (
    <AuthContextProvider>
      <InitialLayout />
    </AuthContextProvider>
  )
}