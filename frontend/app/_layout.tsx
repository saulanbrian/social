import React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedText } from '../components/ui'

import { Slot, useRouter, Stack } from 'expo-router'

import { AuthContextProvider, useAuthContext } from '../context/authentication'
import { ThemeContextProvider, useThemeContext } from '../context/theme'

import * as NavigationBar from 'expo-navigation-bar'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const queryClient = new QueryClient()


function InitialLayout(){
  
  const { theme } = useThemeContext()
  
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown:false }}/>
      <Stack.Screen name='(home)' options={{
        headerTitle:() => {
          return <ThemedText style={styles.headerText}>Home</ThemedText>
        },
        headerStyle:{
          backgroundColor:theme.colors.primary
        }
      }}/>
      <Stack.Screen name='authentication' options={{ headerShown:false }}/>
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerText:{
    fontSize:24,
    fontWeight:700
  }
})

export default function RootLayout(){
  
  React.useEffect(() => {
    const hideNavBar = async() => {
      await NavigationBar.setVisibilityAsync('hidden')
      await NavigationBar.setBehaviorAsync('overlay-swipe')
    }
    hideNavBar()
  },[])
  
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <InitialLayout />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}