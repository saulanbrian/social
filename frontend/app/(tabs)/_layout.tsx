import { NavigationContainer } from '@react-navigation/native';
import { Stack, Redirect, Tabs } from 'expo-router' 
import Ionicons from '@expo/vector-icons/Ionicons'
import { TabBarIcon } from '@/components/ui'


import * as SecureStore from 'expo-secure-store'

import { useGetInfiniteNotifications } from '@/api/queries/notification'
import { useThemeContext } from '@/context/theme'
import { useAuthContext } from '@/context/authentication'
import { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { refreshToken, getAccessToken, getRefreshToken,  } from '@/utils/authentication'
import { jwtDecode } from 'jwt-decode'
import { summarizeQueryPagesResult } from '@/utils/queries'

import { Notification } from '@/types/notification'
import UpdateContextProvider, { useUpdateContext } from '@/context/update'


const WEBSOCKET_URL = process.env.EXPO_PUBLIC_WS_URL

// const Tabs = createMaterialTopTabNavigator()

const HomeLayout = () => {

  const { theme } = useThemeContext()
  const { isAuthenticated } = useAuthContext()
  const { freshNotifications } = useUpdateContext()
  
  if(!isAuthenticated) return <Redirect href={'/authentication'} />
  
  return (
    <Tabs
      initialRouteName='feed'
      screenOptions={({ route }) => ({
        headerTitleStyle:{
          fontSize:24,
          fontWeight:'700',
          color:theme.colors.tabBarIcon
        },
        headerStyle:{
          backgroundColor:theme.colors.primary
        },
        lazy:false,
        tabBarItemStyle:{
          alignItems:'center',
          jusitfyContent:'center'
        },
        tabBarStyle:{
          backgroundColor:theme.colors.primary,
          height:64
        },
        tabBarActiveTintColor:theme.colors.tabBarIcon,
        tabBarInactiveTintColor:theme.colors.tabBarIcon,
        tabBarShowLabel:false,
        tabBarShowIcon:true,
        tabBarHideOnKeyboard:true,
        tabBarIcon:({ focused, color, size }: { focused: boolean, color: string, size: number}) => {
          
          let iconName:
          | 'planet' 
          | 'planet-outline'
          | 'notifications-sharp' 
          | 'notifications-outline'
          | 'search'
          | 'search-outline'
          
          route.name === 'feed' 
          ? ( iconName = focused ? 'planet' : 'planet-outline' )
          : route.name === 'notifications'? ( iconName = focused ? 'notifications-sharp' : 'notifications-outline' )
          : iconName = focused ? 'search': 'search-outline'
          
          return (
            <TabBarIcon 
              name={iconName} 
              color={color} 
              size={size} 
              showBadge={
                route.name === 'notifications' && (
                  freshNotifications.length >= 1
                )
              }
              />
          )
        },
      })}>
      <Tabs.Screen name='feed' />
      <Tabs.Screen name='search' options={{
        headerShown:false
      }} />
      <Tabs.Screen name='notifications' />
    </Tabs>
  )
}


const MainLayout = () => {
  return (
    <UpdateContextProvider>
      <HomeLayout />
    </UpdateContextProvider>
  )
}

export default MainLayout;