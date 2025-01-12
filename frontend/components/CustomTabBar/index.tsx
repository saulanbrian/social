import React, { useCallback, useEffect, useMemo, useRef, useState, } from 'react'
import { TabBarButton, ThemedText, ThemedView } from '../ui'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Href, usePathname, useRouter } from 'expo-router';
import { useThemeContext } from '@/context/theme';

export type CustomTabBarTabType = {
   tabName: string; 
   tabLabel?: string 
}

type CustomTabBarProps = {
  tabs: CustomTabBarTabType[];
  parentPath:string | null
}

const CustomTabBar = ({ tabs, parentPath }: CustomTabBarProps ) => {

  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].tabName)
  const { theme } = useThemeContext()

  const handlePress = useCallback((tabName:string) => {
    setCurrentTab(tabName)
    if(tabName === 'index') {
      router.replace(parentPath as Href)
    }else 
    router.replace(parentPath + `/${tabName}` as Href)
  },[])
  
  return (
    <ThemedView style={styles.container}>
      { tabs.map(({ tabName, tabLabel },i) => {
        return (
          <TabBarButton 
            key={`${tabName}_${i}`}
            active={currentTab === tabName}
            label={ tabLabel || tabName }
            onPress={() => handlePress(tabName)}
          />
        )
      })}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    padding:8,
    gap:8
  },
})

export default React.memo(CustomTabBar)