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
        headerTitle:'Home',
        headerTitleStyle:{
          fontSize:24,
          fontWeight:'700',
          color:theme.colors.tabBarIcon
        },
        headerStyle:{
          backgroundColor:theme.colors.primary
        },
        headerShadowVisible:false,
        headerRight:() => <TabHeaderRight color={theme.colors.tabBarIcon} />
      }}/>
      <Stack.Screen name='post' options={{
        headerShown:false,
      }} />
      <Stack.Screen name='comment/[id]' options={{
        headerTitle:'comment',
      }}/>
      <Stack.Screen name='authentication' options={{ headerShown:false }}/>
      <Stack.Screen name='[user]' options={{ headerTitle:'' }} />
    </Stack>
  )
}


const TabHeaderRight = ({ color }: { color: string}) => {

  const router = useRouter()

  const handlePress = () => {
    router.push('/post/create')
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialIcons name='create' size={24} color={color} />
    </TouchableOpacity>
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