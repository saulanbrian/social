import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ThemedText, ThemedView } from '../ui'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Href, usePathname, useRouter } from 'expo-router';
import { useTabBarContext } from '@/context/tabBar';
import { useThemeContext } from '@/context/theme';

type CustomTabBarProps = {
  tabs: { tabName: string; tabLabel?: string }[];
  parentPath:string | null
}

const CustomTabBar = ({ tabs, parentPath }: CustomTabBarProps ) => {

  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].tabName)
  const { theme } = useThemeContext()

  const handlePress = (tabName:string) => {
    setCurrentTab(tabName)
    if(tabName === 'index') {
      router.replace(parentPath as Href)
    }else 
    router.replace(parentPath + `/${tabName}` as Href)
  }
  
  return (
    <ThemedView style={styles.container}>
      { tabs.map(({ tabName, tabLabel },i) => {
        return (
          <TouchableOpacity 
            onPress={() => handlePress(tabName)} 
            key={i} 
            style={
              [
                {
                  backgroundColor:currentTab === tabName
                  ? theme.colors.tint
                  : theme.colors.background.card
                },
                styles.tab
              ]
            }>
            <ThemedText style={
              [
                { 
                  color: tabName === currentTab
                  ? theme.colors.tabBarIcon
                  : theme.colors.text
                },
                styles.text
              ]
            }>{ tabLabel || tabName }</ThemedText>
          </TouchableOpacity>
        )
      })}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    flex:1,
    paddingHorizontal:8,
    gap:8
  },
  tab:{
    padding:12,
    borderRadius:8
  },
  text:{
    fontSize:14
  }
})

export default React.memo(CustomTabBar)