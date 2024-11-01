import React, { useState } from 'react'
import {
  ActivityIndicator,
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { ThemedView, ThemedText } from '../components/ui'
import { Card } from '../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

import { useAuthContext } from '../context/authentication'
import { useThemeContext } from '../context/theme'

export default function Index(){
  
  const [initialPage,setInitialPage] = useState(null)
  const { isAuthenticated, isLoading } = useAuthContext()
  const { theme } = useThemeContext()
  const router = useRouter()
  
  React.useEffect(() => {
    if(!isLoading){
      const page = isAuthenticated? '/(home)/feed' : '/authentication'
      setInitialPage(page)
    }
  },[isLoading])
  
  const handlePress = () => {
    if(setInitialPage) router.replace(initialPage)
  }
  
  
  return (
    <SafeAreaView style={{flex:1,}}>
      <ThemedView style={styles.container}>
      
        <ThemedView>
          <ThemedText style={styles.text}>
            Hello SupaNi**a! 
          </ThemedText>
        </ThemedView>
        
        <TouchableOpacity 
          style={
            [
              { backgroundColor: theme.colors.secondary },
              styles.button
            ]
          } 
          onPress={handlePress}>
          <ThemedText style={{ fontSize: 20 }}>
            GET STARTED
          </ThemedText>
        </TouchableOpacity>
        
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button:{
    position:'absolute',
    bottom:0,
    width:'100%',
    padding:24,
    alignItems:'center',
    justifyContent:'center'
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:50,
    fontWeight:800,
    alignSelf:'center',
    marginBottom:100
  }
})