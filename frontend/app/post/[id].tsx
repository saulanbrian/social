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

const PostDetailPage = () => {
  
  const queryClient = useQueryClient()
  const { theme } = useThemeContext()
  const { id } = useLocalSearchParams()
  const { data:post, isFetching, status } = useGetPost(id)
  
  return !!post ? (
    <ScrollView style={
      [
        styles.container,
        { backgroundColor:theme.colors.background.default } 
      ]
    }>
    
      { post.image && (
        <Image 
          source={{ uri: post.image }} 
          style={[styles.image,]}/>
      ) }
      
      <PostCard post={post} imageShown={false}/>
      
    </ScrollView>
  ): isFetching? (
    <ThemedActivityIndicator style={styles.indicator}/>
  ): status === 'error' &&(
    <ThemedText>an errror has occured</ThemedText>
  )
}

const styles = StyleSheet.create({
  container:{
    minHeight:Dimensions.get('window').height,
  },
  image:{
    contentFit:'contain',
    aspectRatio:1,
  },
  indicator:{
    flex:1,
    alignSelf:'center'
  },
  
})

export default PostDetailPage;