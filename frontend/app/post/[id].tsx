import { 
  ThemedText, 
  ThemedView,
  ThemedActivityIndicator,
  Avatar,
  Card,
  FlatInput,
  TouchableIcon,
} from '../../components/ui'
import PostCard from '../../components/PostCard'
import InfiniteCommentsFlashList from '../../components/InfiniteCommentsFlashList'
import { 
  StyleSheet,
  ScrollView,
  Dimensions, 
  View,
  Keyboard
} from 'react-native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useGetPost } from '../../api/queries/post'
import { useQueryClient } from '@tanstack/react-query'
import { useAddComment } from '../../api/interactions/comments'
import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect, useRef } from 'react'
import { useThemeContext } from '../../context/theme'
import { useUserStore } from '../../stores/user'

import { summarizeQueryPagesResult } from '../../utils/queries.tsx'


const API_URL = process.env.EXPO_PUBLIC_API_URL

const PostDetailPage = () => {
  
  const queryClient = useQueryClient()
  const { theme } = useThemeContext()
  const { id } = useLocalSearchParams()
  const { data:post, isFetching, status: postStatus } = useGetPost(id)
  const [comment, setComment] = useState<string>(null)
  const { mutate:postComment, isPending, status:commentStatus } = useAddComment(id)
  const [commentBoxHeight,setCommentBoxHeight] = useState<number>(null)
  
  const { profileURL } = useUserStore()
  
  useEffect(() => {
    if(commentStatus === 'success'){
      setComment(null)
    }
  },[commentStatus])
  
  const handleSendComment = () => {
    Keyboard.dismiss()
    if(!isPending && comment) {
      postComment(comment)
    }
  }
  
  const handleCommentBoxLayout = (e) => {
    if(!commentBoxHeight){
      setCommentBoxHeight(e.nativeEvent.layout.height)
    }
  }
  
  return !!post ? (
    <ThemedView style={{flex:1,position:'relative'}}>
      <ScrollView>
      
        { post.image && (
          <Image 
            source={{ uri: post.image }} 
            style={[styles.image,]}/>
        ) }
        
        <PostCard post={post} imageShown={false}/>
        <ThemedText style={styles.commentSectionHeader}>
          newest first
        </ThemedText>
        <InfiniteCommentsFlashList 
          contentContainerStyle={{paddingBottom:commentBoxHeight}}
          postId={id} />
      </ScrollView>
      
      <ThemedView 
        style={styles.commentBoxContainer} 
        onLayout={handleCommentBoxLayout}>
        <TouchableIcon 
          name={'folder-open'} 
          color={theme.colors.tint}
          size={28}/>
        <Avatar source={profileURL} size={36} />
        <FlatInput
          value={comment}
          onChangeText={setComment}
          placeholder={'comment'} style={styles.commentInput}/>
        <TouchableIcon 
          name={'send'} 
          color={theme.colors.tint}
          size={24}
          onPress={handleSendComment}/>
      </ThemedView>
        
    </ThemedView>
  ): isFetching? (
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
  commentSectionHeader:{
    fontSize:16,
    fontWeight:400,
    marginTop:24,
    marginBottom:8,
    marginLeft:8
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