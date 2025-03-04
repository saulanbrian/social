import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ThemedText } from '../components/ui'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot, useRouter, Stack } from 'expo-router'

import { AuthContextProvider, useAuthContext } from '../context/authentication'
import { ThemeContextProvider, useThemeContext } from '../context/theme'
import { GlobalSocketContextProvider } from '../context/socket'

import * as NavigationBar from 'expo-navigation-bar'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { StatusBar } from 'expo-status-bar'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen'


const queryClient = new QueryClient()

function InitialLayout(){
  
  const { theme } = useThemeContext()
  
  return (
    <Stack screenOptions={{
      headerStyle:{
        backgroundColor:theme.colors.background.card
      },
      headerTintColor:theme.colors.text,
    }}>
      <Stack.Screen name='index' options={{ headerShown:false }}/>
      <Stack.Screen name='(tabs)' options={{
        headerShown:false
      }}/>
      <Stack.Screen name='post' options={{
        headerShown:false,
      }} />
      <Stack.Screen name='comment/[id]' options={{
        headerTitle:'comment',
      }}/>
      <Stack.Screen name='authentication' options={{ headerShown:false }}/>
      <Stack.Screen name='[user]' options={{ headerTitle:'' }} />
      <Stack.Screen name='profile' options={{ headerTitle: '' }} />
      <Stack.Screen name='images' options={{ headerShown: false}} />
      <Stack.Screen name='message' options={{ headerShown: false }} />
    </Stack>
  )
}


export default function RootLayout(){
  
  React.useEffect(() => {
    const hideNavBar = async() => {
      await SplashScreen.preventAutoHideAsync()
      await NavigationBar.setVisibilityAsync('hidden')
      await NavigationBar.setBehaviorAsync('overlay-swipe')
    }
    hideNavBar()
  },[])
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <GlobalSocketContextProvider>
          <ThemeContextProvider>
            <InitialLayout />
          </ThemeContextProvider>
        </GlobalSocketContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}