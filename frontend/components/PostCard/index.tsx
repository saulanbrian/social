import { Card, Avatar, ThemedText, ThemedView, TouchableIcon } from '../ui'
import PostActions from './actions'
import { Pressable, StyleSheet, TouchableOpacity, View, ViewProps,} from 'react-native'
import { Image } from 'expo-image'
import Ionicons  from '@expo/vector-icons/Ionicons'

import { Post } from '../../types/post'

import React, { useRef } from 'react'
import { useThemeContext } from '../../context/theme'
import { useRouter } from 'expo-router'

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
  const router = useRouter()

  const handlePress = () => {
    router.navigate({
      pathname: '/post/[id]',
      params: { id: post.id }
    })
  }
  
  return (
    <Pressable 
      onPress={handlePress}
      style={
        [
          styles.card,
          { 
            backgroundColor: theme.colors.background.card
          }
        ]
      }>
      <PostHeader 
        authorProfile={ post.author_profile }
        authorUsername={ post.author_username }
        authorId={post.author_id} />
      <PostImage source={post.image} shown={imageShown}/>
      <PostCaption caption={post.caption} />
      <PostActions postId={post.id} is_liked={post.is_liked} authorId={post.author_id}/>
    </Pressable>
  )
}


type PostImageProps = {
  source:string | null;
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
  authorUsername:string;
  authorId:string;
}


const PostHeader = ({
  authorProfile,
  authorUsername,
  authorId
}: PostHeaderProps ) =>  {
  
  const { theme } = useThemeContext()
  
  return (
    <View style={styles.header}>
      <Avatar 
        shape={'square'} 
        size={42} 
        source={ API_URL + authorProfile} 
        autolinkToProfile 
        userId={authorId}
      />
        
      <View style={{ gap:2 }}>
        <ThemedText style={styles.username}>{ authorUsername }</ThemedText>
        <ThemedText style={styles.date}>6 hours ago</ThemedText>
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
        }}
        />
        
    </View>
  )
}


const PostCaption = ({caption}:{ caption: string | null }) => {
  return caption? (
    <ThemedText style={styles.caption}>
      { caption }
    </ThemedText>
  ): null
}


const styles = StyleSheet.create({
  avatar:{
    borderRadius:8
  },
  caption:{
    marginLeft:4,
    marginTop:4,
    marginBottom:4,
  },
  card:{
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
    aspectRatio:1,
    borderRadius:8,
    marginBottom:4
  },
  username:{
    fontSize:17,
    fontWeight:700,
    paddingTop:2
  }
})

export default React.memo(PostCard)


