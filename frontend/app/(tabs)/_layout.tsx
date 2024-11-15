import { NavigationContainer } from '@react-navigation/native';

import { useThemeContext } from '@/context/theme'
import { useAuthContext } from '@/context/authentication'
import { Stack, Redirect } from 'expo-router' 

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfilePage  from './profile'
import Feed  from './feed'
import NotificationsPage from './notifications'

import Ionicons from '@expo/vector-icons/Ionicons'

const Tabs = createMaterialTopTabNavigator()

const HomeLayout = () => {

  const { theme } = useThemeContext()
  const { isAuthenticated } = useAuthContext()
  
  if(!isAuthenticated) return <Redirect href={'/authentication'} />
  
  return (
    <NavigationContainer>
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
          jusitfyContent:'center',
          paddingVertical:8,
          backgroundColor:theme.colors.primary,
          overflow:'hidden',
          position:'fixed',
        },
        tabBarIndicatorStyle:{
          backgroundColor:theme.colors.text,
          height:4
        },
        tabBarActiveTintColor:theme.colors.text,
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
    </NavigationContainer>
  )
}

export default HomeLayout;