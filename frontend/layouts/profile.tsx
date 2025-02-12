import { Slot, Stack, useFocusEffect, usePathname, useRouter, useSegments  } from "expo-router"
import { ThemedView, ThemedText, Avatar, ThemedActivityIndicator, ThemedScrollView } from '@/components/ui'
import { Text, StyleSheet, ScrollView, DimensionValue, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, LayoutChangeEvent, View} from 'react-native'
import { ProfileHeader } from "@/components"

import { useThemeContext } from "@/context/theme"
import { createContext, Suspense, useEffect, useRef, useState } from "react"
import { useGetUser } from "@/api/queries/user"

import User from "@/types/user"
import CustomTabBar from "@/components/CustomTabBar"
import ProfileLayoutContextProvider, { useProfileLayoutContext } from "@/context/profile-layouts"
import Animated, { interpolate, measure, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withDelay, withSpring, withTiming } from "react-native-reanimated"


type ProfileLayoutProps = {
  tabs:{ tabName: string, tabLabel?: string}[];
  user:User;
  parentPath:string | null;
  children?: React.ReactNode;
}

const ProfileLayout = ({
  parentPath,
  user, 
  tabs, 
  children
 }: ProfileLayoutProps) => {

  const { childrenScrollOffsetY, setHeaderHeight, headerHeight } = useProfileLayoutContext()
  const { theme } = useThemeContext()
  
  const rStyles = useAnimatedStyle(() => ({
    transform:[
      {
        translateY:withSpring( -childrenScrollOffsetY.value, { damping: 100 } )
      }
    ],
    position:'absolute',
    zIndex:1,
    width:'100%'
  }))

  const handleLayout = (e:LayoutChangeEvent) => {
    const heigth = e.nativeEvent.layout.height
    setHeaderHeight(heigth) //used in tabs to define paddings
  }

  const handleTabPress = () => {
    childrenScrollOffsetY.value = 0
  }

  return (
    <ThemedView style={{flex:1,position:'relative'}}>

      <Animated.View style={[rStyles]} onLayout={handleLayout}>
        <ProfileHeader {...user} />
        { children }        
        <CustomTabBar tabs={tabs} parentPath={parentPath} onTabPRess={handleTabPress}/>
      </Animated.View>

      <ThemedView style={[{flex:1}]}>   
        <Stack screenOptions={{
          headerShown: false,
          contentStyle:{
            backgroundColor:theme.colors.background.default
          }
        }} />
      </ThemedView>
      
    </ThemedView>
  )
}

const InitialLayout = (props:ProfileLayoutProps) => {
  return (
    <ProfileLayoutContextProvider>
      <ProfileLayout {...props}/>
    </ProfileLayoutContextProvider>
  )
}

export default InitialLayout