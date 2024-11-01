import React from 'react'
import { Slot, useRouter, Stack } from 'expo-router'

import { AuthContextProvider, useAuthContext } from '../context/authentication'
import { ThemeContextProvider, useThemeContext } from '../context/theme'


function InitialLayout(){
  
  const { theme } = useThemeContext()
  
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown:false
      }}/>
      <Stack.Screen name='(home)' options={{
        headerTitle:'home',
        headerStyle:{
          backgroundColor:theme.colors.secondary
        }
      }}/>
      <Stack.Screen name='authentication' options={{
        headerShown:false
      }}/>
    </Stack>
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