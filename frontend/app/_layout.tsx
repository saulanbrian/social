import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ThemedText } from '../components/ui'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot, useRouter, Stack } from 'expo-router'

import { AuthContextProvider, useAuthContext } from '../context/authentication'
import { ThemeContextProvider, useThemeContext } from '../context/theme'

import * as NavigationBar from 'expo-navigation-bar'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { StatusBar } from 'expo-status-bar'

const queryClient = new QueryClient()


function InitialLayout(){
  
  const { theme } = useThemeContext()
  
  return (
    <>
    <StatusBar transculent />
    <Stack screenOptions={{
      cardStyle:{
        paddingTop:50
      }
    }}>
      <Stack.Screen name='index' options={{ headerShown:false }}/>
      <Stack.Screen name='(tabs)' options={{
        headerTitle:() => {
          return (
            <Text style={
              [
                styles.headerText,
                {
                  color:theme.colors.tabBarIcon
                }
              ]
            }>Home</Text>
          )
        },
        headerStyle:{
          backgroundColor:theme.colors.primary
        },
        headerShadowVisible:false
      }}/>
      <Stack.Screen name='post' options={{
        headerShown:false
      }} />
      <Stack.Screen name='authentication' options={{ headerShown:false }}/>
    </Stack>
    </>
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