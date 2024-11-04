import { useEffect } from 'react'
import { ThemedView, ThemedText } from '../../components/ui'

import { useAuthContext } from  '../../context/authentication'
import { useUserStore } from '../../stores/user'

import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'

import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import api from '@/api'

import { API_URL } from '@/constants/api'
import { useUpdateUserMutation } from '@/api/queries/user'




const Profile = () => {
  
  const { username, profileURL, setProfileURL, id } = useUserStore()
  const { mutate: updateProfile, data, isSuccess, isPending } = useUpdateUserMutation(id as string | number)
  
  const handlePress = async() => { 
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

      <ThemedText>{ id }</ThemedText>
      
      <TouchableOpacity style={styles.imageContainer} onPress={handlePress}>
        <Image 
          style={styles.image}
          source={!!profileURL ? profileURL  : require('../../assets/images/profile.png')}
          priority='high'
          cachePolicy='memory-disk'
          />
      </TouchableOpacity> 

    </ThemedView>
  );
};


const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 8,
  },
  image:{
    height:200,
    width:200,
  },
  imageContainer:{
     borderRadius:360,
     width:200,
     height:200,
     alignSelf:'center',
     padding:10,
     marginTop:20,
     overflow:'hidden',
     justifyContent:'center',
     alignItems:'center'
  }
})

export default Profile;