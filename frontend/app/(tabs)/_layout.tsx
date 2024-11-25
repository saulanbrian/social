import { NavigationContainer } from '@react-navigation/native';
import { Stack, Redirect } from 'expo-router' 
import Ionicons from '@expo/vector-icons/Ionicons'

import ProfilePage  from './profile'
import Feed  from './feed'
import NotificationsPage from './notifications'

import * as SecureStore from 'expo-secure-store'

import { useThemeContext } from '@/context/theme'
import { useAuthContext } from '@/context/authentication'
import { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { refreshToken, getAccessToken, getRefreshToken,  } from '../../utils/authentication'
import { jwtDecode } from 'jwt-decode'


const WEBSOCKET_URL = process.env.EXPO_PUBLIC_WS_URL

const Tabs = createMaterialTopTabNavigator()

const HomeLayout = () => {

  const { theme } = useThemeContext()
  const { isAuthenticated } = useAuthContext()
  
  if(!isAuthenticated) return <Redirect href={'/authentication'} />

  
  return (
    <Tabs.Navigator
      headerTransparent={true}
      initialRouteName='feed'
      tabBarPosition='bottom'
      tabBarLabelShown={false}
      screenOptions={({ route }) => ({
        tabBarItemStyle:{
          alignItems:'center',
          jusitfyContent:'center'
        },
        tabBarStyle:{
          bottom:0,
          width:'100%',
          alignSelf:'center',
          justifyContent:'center',
          paddingVertical:8,
          backgroundColor:theme.colors.primary,
          overflow:'hidden',
          position:'fixed',
        },
        tabBarIndicatorStyle:{
          backgroundColor:theme.colors.tabBarIcon,
          height:4
        },
        tabBarActiveTintColor:theme.colors.tabBarIcon,
        tabBarShowLabel:false,
        tabBarShowIcon:true,
        tabBarIcon:({ focused, color }) => {
          
          let iconName:
          'planet' | 'planet-outline' | 'person-circle' | 'person-circle-outline' | 'notifications-sharp' | 'notifications-outline'
          
          route.name === 'feed' ? (
            iconName = focused ? 'planet' : 'planet-outline'
          ): route.name === 'profile' ? (
            iconName = focused ? 'person-circle' : 'person-circle-outline'
          ): iconName = focused ? 'notifications-sharp' : 'notifications-outline'
          
          return <Ionicons name={iconName} color={color} size={24} />
        },
      })}>
      <Tabs.Screen name='feed' component={Feed}/>
      <Tabs.Screen name='notifications' component={NotificationsPage}/>
      <Tabs.Screen name='profile' component={ProfilePage}/>
    </Tabs.Navigator>
  )
}

export default HomeLayout;