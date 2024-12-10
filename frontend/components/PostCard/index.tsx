import { Card, Avatar, ThemedText, ThemedView, TouchableIcon } from '../ui'
import PostActions from './actions'
import { StyleSheet, View, ViewProps,} from 'react-native'
import { Image } from 'expo-image'
import Ionicons  from '@expo/vector-icons/Ionicons'

import { Post } from '../../types'

import React, { useRef } from 'react'
import { useThemeContext } from '../../context/theme'

const API_URL = process.env.EXPO_PUBLIC_API_URL


type PostProps = ViewProps & {
  post: Post;
  preview?:boolean;
  imageShown?: boolean;
}


const PostCard = ({ 
  post,
  style,
  imageShown=true,
  preview,
  ...props
} : PostProps) => {
  
  const { theme } = useThemeContext()
  
  return (
    <ThemedView style={
      [
        styles.card,
        { backgroundColor: theme.colors.background.card }
      ]
    }>
      <PostHeader 
        authorProfile={ post.author_profile }
        authorUsername={ post.author_username } />
      <PostImage source={post.image} shown={imageShown}/>
      <PostCaption caption={post.caption} />
      <PostActions postId={post.id} is_liked={post.is_liked}/>
    </ThemedView>
  )
}


type PostImageProps = {
  source:string;
  shown:boolean;
}

const PostImage = ({ source, shown }:PostImageProps) => {
  return shown && !!source && (
    <Image 
      source={source}
      accessible
      style={ styles.image }/>
  )
}


type PostHeaderProps = {
  authorProfile:string;
  authorUsername:string
}


const PostHeader = ({
  authorProfile,
  authorUsername
}: PostHeaderProps ) =>  {
  
  const { theme } = useThemeContext()
  
  return (
    <View style={styles.header}>
      <Avatar 
        shape={'square'}
        size={42} 
        source={ API_URL + authorProfile} />
        
      <View style={{ gap:2 }}>
        <ThemedText style={styles.username}>
          { authorUsername } 
        </ThemedText>
        <ThemedText style={styles.date}>
          6 hours ago
        </ThemedText>
      </View>
      
      <TouchableIcon 
        size={20}
        color={theme.colors.text}
        name='ellipsis-vertical' 
        style={{
          marginLeft:'auto',
          position:'absolute',
          right:0,
          top:2
        }}/>
        
    </View>
  )
}


const PostCaption = ({caption}:{ caption: string }) => {
  return (
    <ThemedText style={styles.caption}>
      { caption }
    </ThemedText>
  )
}


const styles = StyleSheet.create({
  avatar:{
    borderRadius:8
  },
  caption:{
    marginLeft:4,
    marginTop:4,
    marginBottom:8
  },
  card:{
    overflow:'clipped',
    padding:12,
  },
  date:{
    fontSize:12
  },
  footer:{
    flex:1,
  },
  header:{
    flexDirection:'row',
    gap:6,
    marginBottom:8,
    position:'relative'
  },
  image:{
    contentFit:'cover',
    aspectRatio:1,
    borderRadius:8,
  },
  username:{
    fontSize:17,
    fontWeight:700,
    paddingTop:2
  }
})

export default React.memo(PostCard)


// <Card style={[styles.card, style]} {...props} >
//       <Card.Header>
//         <PostHeader 
//           authorProfile={post.author_profile}
//           authorUsername={post.author_username} />
//       </Card.Header>
//       
//       <View style={styles.content} >
//         <PostCaption caption={post.caption}/>
//         <PostImage source={post.image} shown={imageShown} />
//       </View>
//       
//       { !preview &&  (
//         <Card.Footer style={styles.footer}>
//           <PostActions 
//             is_liked={post.is_liked} 
//             postId={post.id}/>
//         </Card.Footer>
//       ) } 
//     </Card>