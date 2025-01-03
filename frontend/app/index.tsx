import React, { useEffect, useState } from 'react'
import {ActivityIndicator,View,Pressable,TouchableOpacity,StyleSheet} from 'react-native'
import { ThemedView, ThemedText, ThemedActivityIndicator } from '../components/ui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Href, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

import { useAuthContext } from '../context/authentication'
import { useThemeContext } from '../context/theme'
import { AutoCenteredActivityIndicator } from '@/components'

export default function Index(){
  
  const [initialPage,setInitialPage] = useState<string | null>(null)
  const { isAuthenticated, isLoading } = useAuthContext()
  const { theme } = useThemeContext()
  const router = useRouter()
  
  useEffect(() => {
    if(!isLoading){
      const page = isAuthenticated? '/(tabs)/feed' : '/authentication'
      setInitialPage(page)
    }
  },[isLoading])

  useEffect(() => {
    if(initialPage){
      router.replace(initialPage as Href)
    }
  },[initialPage])

  
  return (
    <SafeAreaView style={{ flex: 1}}>
      <ThemedView style={styles.container}>
    
        <ThemedView style={styles.welcomeTextContainer}>
          <ThemedText style={styles.headerText}>HELLO DRAGON</ThemedText>
          <ThemedText style={styles.subHeaderText}>you're not actually welcome here but ok, you may come</ThemedText>
        </ThemedView>

        <ThemedText style={styles.loadingText}>
          please wait while we retrieve user information ( as if im with a team)
        </ThemedText>

        <ThemedActivityIndicator style={styles.indicator}/>
        
      </ThemedView>
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  headerText:{
    fontSize:36,
    fontWeight:800
  },
  indicator:{
    marginVertical:16
  },
  loadingText:{
    marginHorizontal:60,
    textAlign:'center',
    fontSize:12
  },
  subHeaderText:{
    maxWidth:240
  },
  welcomeTextContainer:{
    flex:1,
    paddingTop:240,
    paddingLeft:8
  }
})