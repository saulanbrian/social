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
    <Tabs.Navigator
      initialRouteName='feed'
      tabBarPosition='bottom'
      tabBarLabelShown={false}
      screenOptions={({ route }) => ({
        tabBarItemStyle:{
          alignItems:'center',
          jusitfyContent:'center'
        },
        tabBarStyle:{
          bottom:4,
          width:'90%',
          alignSelf:'center',
          jusitfyContent:'center',
          padding:8,
          borderRadius:8
        },
        headerTitleShown:false,
        tabBarShowLabel:false,
        tabBarShowIcon:true,
        tabBarIcon:({ focused, color, size }) => {
          
          let iconName: string = ''
          
          route.name === 'feed' ? (
            iconName = focused ? 'rocket' : 'rocket-outline'
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