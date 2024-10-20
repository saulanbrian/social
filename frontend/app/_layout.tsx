import React from 'react'
import { Stack } from 'expo-router'
import { AuthContextProvider, useAuthContext } from '../context/authentication'
import { View } from 'react-native'

const CoreStack = () => {
  
  const { isAuthenticated } = useAuthContext()
  
  return (
    <Stack initialRouteName={isAuthenticated? '(home)': '(authentication)'} >
      <Stack.Screen
        name='(home)' 
        options={{ headerShown:false }}/>
      <Stack.Screen 
        name='(authentication)' 
        options={{ headerShown:false }}/>
    </Stack>
  )
}


const RootLayout = () => {
  return (
    <AuthContextProvider>
      <CoreStack/>
    </AuthContextProvider>
  )
}

export default RootLayout;