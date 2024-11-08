import Card from '../Card'
import { ThemedText, ThemedView, Avatar } from '../ui'
import { ViewProps, StyleSheet } from 'react-native'
import { Image } from 'expo-image'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export type PostProps = {
  author_username:string,
  author_profile:string,
  caption:string,
  image?:string
}

const Post = ({
  author_username,
  author_profile,
  caption,
  image,
  style,
  ...props
}:PostProps & ViewProps) => {
  
  
  return (
    <ThemedView style={[styles.container,style]} { ...props }>
    
      <Avatar size={40} source={API_URL + author_profile} style={{marginTop:4}}/>
      
      <ThemedView style={{flex:1,gap:4}} >
        <ThemedText style={styles.username}>
          { author_username }
        </ThemedText>
        <ThemedText>
          { caption }
        </ThemedText>
        <Image source={{ uri:image }} style={styles.image} resizeMode='cover'/>
        
      </ThemedView>
      
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  container:{
    padding:12,
    flexDirection:'row',
    gap:8
  },
  username:{
    fontSize:16,
    fontWeight:600
  },
  image:{
    aspectRatio:1,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
    maxWidth:220,
  }
})

export default Post;