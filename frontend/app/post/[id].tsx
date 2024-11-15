import { 
  ThemedText, 
  ThemedView,
  ThemedActivityIndicator,
  Avatar,
  Card
} from '../../components/ui'
import PostCard from '../../components/PostCard'

import { StyleSheet, ScrollView, Dimensions, View } from 'react-native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useGetPost } from '../../api/queries/post'
import { useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { useThemeContext } from '../../context/theme'

import { summarizeQueryPagesResult } from '../../utils/queries.tsx'


const API_URL = process.env.EXPO_PUBLIC_API_URL

const MainContainer = ({ cachedPost, fallbackId }) => {
  
  const [enabled, setEnabled] = useState(false)
  const { 
    data:newlyFetchedPost,
    isLoading,
    status
  } = useGetPost(fallbackId,enabled)
  const post = cachedPost || newlyFetchedPost 
  const { theme } = useThemeContext()
  const { height } = Dimensions.get('window')
  
  useEffect(() => {
    if(!post) {
      setEnabled(true)
    }
  },[])
  
  return !!post ? (
    <ScrollView style={{flex:1,minHeight:height}}>
    
      { post.image && (
        <Image 
          source={{ uri: post.image }} 
          style={[styles.image,]}/>
      ) }
      
      <PostCard post={post} imageShown={false}/>
      
    </ScrollView>
  ): isLoading? (
    <ThemedActivityIndicator style={styles.indicator}/>
  ): status === 'error' &&(
    <ThemedText>an errror has occured</ThemedText>
  )
}


const styles = StyleSheet.create({
  image:{
    contentFit:'contain',
    aspectRatio:1,
  },
  indicator:{
    flex:1,
    alignSelf:'center'
  },
  
})


const PostDetailPage = () => {
  
  const queryClient = useQueryClient()
  const { id } = useLocalSearchParams()
  const cachedPosts = queryClient.getQueryData(['posts'])
  const cachedPost = cachedPosts? summarizeQueryPagesResult(cachedPosts).find(post => post.id === id): undefined
  
  return (
    <ThemedView style={{flex:1}}>
      <MainContainer cachedPost={cachedPost} fallbackId={id}/>
    </ThemedView>
  )
}

export default PostDetailPage;