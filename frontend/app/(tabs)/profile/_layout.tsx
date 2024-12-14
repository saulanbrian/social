import { Slot, Tabs } from "expo-router"
import { useEffect } from 'react'
import { ThemedView, ThemedText, Avatar } from '@/components/ui'

import { useAuthContext } from  '@/context/authentication'
import { useUserStore } from '@/stores/user'

import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'

import { StyleSheet, Text, TouchableOpacity, Alert} from 'react-native'
import api from '@/api'

import { API_URL } from '@/constants/api'
import { useUpdateUserMutation } from '@/api/queries/user'
import { useThemeContext } from "@/context/theme"


const ProfileTabs = () => {

  const { theme } = useThemeContext()

  return (
    <ThemedView style={{flex:1, position:'relative'}}>
      <ProfileHeader />
      <Tabs 
        sceneContainerStyle={{
          paddingTop:36,
          backgroundColor:theme.colors.background.default
        }}
        screenOptions={{
        headerShown:false,
        tabBarStyle:{
          position:'absolute',
          top:-24,
          alignItems:'center',
          width:160,
          backgroundColor:'transparent',
          shadowOpacity:0,
          elevation:0,
          padding:0
        },
        tabBarIcon: () => null,
        tabBarLabelStyle:{
          fontSize:12
        },
        tabBarActiveTintColor:theme.colors.tint,
      }}>
        <Tabs.Screen name='index' options={{ 
          tabBarLabel:({focused}) => (
            <Text style={{ 
              backgroundColor: focused?  theme.colors.tint: theme.colors.background.card,
              color:focused? theme.colors.tabBarIcon: theme.colors.text,
              padding:16,
              borderRadius:8
            }}> 
              posts
            </Text>
          )
        }} />
        <Tabs.Screen name='photos' options={{ 
          tabBarLabel:({focused}) => (
            <Text style={{ 
              backgroundColor: focused?  theme.colors.tint: theme.colors.background.card,
              color:focused? theme.colors.tabBarIcon: theme.colors.text,
              padding:16,
              borderRadius:8
            }}> 
              photos
            </Text>
          )
        }} />
      </Tabs>
    </ThemedView>
  )
}

const ProfileHeader = () => {
  
  const { username, profileURL, setProfileURL, id } = useUserStore()
  const { mutate: updateProfile, data, isSuccess, isPending } = useUpdateUserMutation(id as string | number)
  
  const handlePress = async() => { 
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
    })

    if(!canceled && assets.length >= 1){

      const fileExtension = assets[0].uri.split('.').pop()

      const data = new FormData()
      data.append('profile_picture',{
        uri:assets[0].uri,
        name:`profile.${fileExtension}`,
        type:`imgage/${fileExtension}`
      } as unknown as Blob)
      
      updateProfile(data)

    }
  }

  useEffect(() => {
    if(isSuccess) {
      setProfileURL(data.profile_picture)
    }
  }, [isSuccess])

  return (
    <ThemedView style={styles.container}>
        <Avatar 
          size={200}
          style={styles.imageContainer}
          onPress={handlePress}
          source={profileURL}
          imageProps={{
            priority:'high',
            cachePolicy:'memory-disk'
          }}
          />
        <ThemedText style={styles.username}>{ username }</ThemedText>
    </ThemedView>
  );
};


const styles = StyleSheet.create({
  container:{
    padding: 8,
    paddingBottom:30
  },
  imageContainer:{
     alignSelf:'center',
     justifyContent:'center',
     alignItems:'center',
     position:'relative',
  },
  username:{
    textAlign:'center',
    marginVertical:8,
    fontSize:20,
    fontWeight:600,
  }
})


export default ProfileTabs;