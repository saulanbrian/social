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
        headerShown:false,
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
        tabBarIcon:({ focused, color, size }: { focused: boolean, color: string, size: number}) => {
          
          let iconName:
          | 'planet' 
          | 'planet-outline'
          | 'person-circle' 
          | 'person-circle-outline' 
          | 'notifications-sharp' 
          | 'notifications-outline'
          
          route.name === 'feed' ? iconName = focused ? 'planet' : 'planet-outline'
          : route.name === 'profile' ? iconName = focused ? 'person-circle' 
          : 'person-circle-outline' : iconName = focused ? 'notifications-sharp' : 'notifications-outline'
        
          
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
      <Tabs.Screen name='notifications' />
      <Tabs.Screen name='profile'/>
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