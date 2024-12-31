import { Slot, Stack, useFocusEffect, usePathname, useRouter, useSegments  } from "expo-router"
import { ThemedView, ThemedText, Avatar, ThemedActivityIndicator, ThemedScrollView } from '@/components/ui'
import { Text, StyleSheet, ScrollView, DimensionValue, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity} from 'react-native'
import { ProfileHeader } from "@/components"

import { useUserStore } from '@/stores/user'
import { useThemeContext } from "@/context/theme"
import { createContext, Suspense, useEffect, useState } from "react"
import { useGetUser } from "@/api/queries/user"

import User from "@/types/user"
import CustomTabBar from "@/components/CustomTabBar"
import ProfileLayoutContextProvider, { useProfileLayoutContext } from "@/context/profile-layouts"
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated"


type ProfileLayoutProps = {
  tabs:{ tabName: string, tabLabel?: string}[];
  user:User;
  parentPath:string | null;
  children?: React.ReactNode
}

const ProfileLayout = ({ parentPath, user, tabs, children }: ProfileLayoutProps) => {

  const { childrenScrollOffsetY } = useProfileLayoutContext()
  const { theme } = useThemeContext()

  const rStyles = useAnimatedStyle(() => {
    return {
      maxHeight:interpolate(childrenScrollOffsetY.value,
        [50,500],
        [500,0],
        'clamp'
      )
    }
  })


  return (
    <ThemedView style={{flex:1}}>
      <Animated.View style={[rStyles]}>
        <ProfileHeader {...user}/>
        { children }        
        <CustomTabBar tabs={tabs} parentPath={parentPath} />
      </Animated.View>
      <ThemedView style={{flex:1}}>   
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