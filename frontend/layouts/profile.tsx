import { Slot, useFocusEffect, usePathname, useRouter  } from "expo-router"
import { ThemedView, ThemedText, Avatar, ThemedActivityIndicator, ThemedScrollView } from '@/components/ui'
import { Text, StyleSheet, ScrollView, DimensionValue, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity} from 'react-native'
import { ProfileHeader } from "@/components"

import { useUserStore } from '@/stores/user'
import { useThemeContext } from "@/context/theme"
import { createContext, Suspense, useState } from "react"
import { useGetUser } from "@/api/queries/user"

import User from "@/types/user"
import CustomTabBar from "@/components/CustomTabBar"


type ProfileLayoutProps = {
  tabs:{ tabName: string, tabLabel?: string}[];
  user:User;
  parentPath:string | null;
  children?: React.ReactNode
}

const ProfileLayout = ({ parentPath, user, tabs, children }: ProfileLayoutProps) => {

  return (
    <ThemedScrollView>
      <ProfileHeader {...user}/>
      { children }
      <CustomTabBar tabs={tabs} parentPath={parentPath} />
      <Slot />
  </ThemedScrollView>
  )
}



export default ProfileLayout