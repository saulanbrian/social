import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ThemedText } from '../components/ui'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot, useRouter, Stack } from 'expo-router'

import { AuthContextProvider, useAuthContext } from '../context/authentication'
import { ThemeContextProvider, useThemeContext } from '../context/theme'
import { GlobalSocketContextProvider } from '../context/socket'

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
        headerStyle:{
          backgroundColor:theme.colors.background.card
        }
      }}>
        <Stack.Screen name='index' options={{ headerShown:false }}/>
        <Stack.Screen name='(tabs)' options={{
          headerTitle:'Home',
          headerTitleStyle:{
            fontSize:24,
            fontWeight:'700',
            color:theme.colors.tabBarIcon
          },
          headerStyle:{
            backgroundColor:theme.colors.primary
          },
          headerShadowVisible:false
        }}/>
        <Stack.Screen name='post/[id]' options={{
          headerTitle:'post',
          animationForReplace:'pop',
        }} />
        <Stack.Screen name='comment/[id]' options={{
          headerTitle:'comment',
          animationForReplace:'pop'
        }}/>
        <Stack.Screen name='authentication' options={{ headerShown:false }}/>
      </Stack>
    </>
  )
}


export default function RootLayout(){
  
  React.useEffect(() => {
    const hideNavBar = async() => {
      await NavigationBar.setVisibilityAsync('hidden')
      await NavigationBar.setBehaviorAsync('overlay-swipe')
    }
    hideNavBar()
  },[])
  
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalSocketContextProvider>
          <ThemeContextProvider>
            <InitialLayout />
          </ThemeContextProvider>
        </GlobalSocketContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  )
}