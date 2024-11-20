import { 
  ThemedText, 
  ThemedView,
  ThemedActivityIndicator,
  Avatar,
  Card,
  FlatInput,
  TouchableIcon
} from '../../components/ui'
import PostCard from '../../components/PostCard'

import { StyleSheet, ScrollView, Dimensions, View } from 'react-native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useGetPost } from '../../api/queries/post'
import { useGetComments } from '../../api/queries/comments'
import { useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { useThemeContext } from '../../context/theme'
import { useUserStore } from '../../stores/user'

import { summarizeQueryPagesResult } from '../../utils/queries.tsx'


const API_URL = process.env.EXPO_PUBLIC_API_URL

const PostDetailPage = () => {
  
  const queryClient = useQueryClient()
  const { theme } = useThemeContext()
  const { id } = useLocalSearchParams()
  const {
    data: post, 
    isFetching: loadingPost,
    status: postStatus 
  } = useGetPost(id)
  const { 
    data: comments, 
    isFetching: loadingComments, 
    status: commentsStatus
  } = useGetComments(id)
  const { profileURL } = useUserStore()
  
  return !!post ? (
    <View style={{flex:1,position:'relative'}}>
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
        
        { comments && comments.map(comment => {
          return <ThemedText> { comment.text } </ThemedText>
        } )}
        
      </ScrollView>
      
      <ThemedView style={
        [
          { backgroundColor:theme.colors.background.default },
          styles.commentBoxContainer,
        ]
      }>
        <TouchableIcon 
          name={'folder-open'} 
          color={theme.colors.tint}
          size={28}/>
        <Avatar source={profileURL} size={36} />
        <FlatInput placeholder={'comment'} style={styles.commentInput}/>
        <TouchableIcon 
          name={'send'} 
          color={theme.colors.tint}
          size={24}/>
      </ThemedView>
        
    </View>
  ): loadingPost? (
    <ThemedActivityIndicator style={styles.indicator}/>
  ): postStatus === 'error' &&(
    <ThemedText>an errror has occured</ThemedText>
  )
}

const styles = StyleSheet.create({
  container:{
    minHeight:Dimensions.get('window').height,
  },
  commentBoxContainer:{
    padding:12,
    position:'absolute',
    bottom:0,
    flex:1,
    flexDirection:'row',
    width:'100%',
    gap:8,
    alignItems:'center'
  },
  commentInput:{
    padding:12,
    fontSize:16,
    flex:1,
    overflow:'auto'
  },
  image:{
    contentFit:'fill',
    aspectRatio:1,
  },
  indicator:{
    flex:1,
    alignSelf:'center'
  },
  
})

export default PostDetailPage;