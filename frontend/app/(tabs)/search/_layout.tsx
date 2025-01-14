import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useThemeContext } from '@/context/theme'

const SearchLayout = () => {

  const { theme } = useThemeContext()

  return (
    <Stack initialRouteName='index' screenOptions={{
      headerStyle:{
        backgroundColor:theme.colors.primary
      },
      headerTintColor:theme.colors.tabBarIcon
    }}>
      <Stack.Screen name='index' options={{
        headerTitle:'search'
      }} />
      <Stack.Screen name='[keyword]' options={{
        headerTitle:'',
        headerStyle:{
          backgroundColor:theme.colors.background.default
        },
        headerTintColor:theme.colors.text,
        headerShadowVisible:false
      }}/>
    </Stack>
  )
}

export default SearchLayout