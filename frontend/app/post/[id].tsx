import { 
  ThemedText, 
  ThemedView,
  ThemedActivityIndicator,
  Avatar,
  Card,
  FlatInput,
  TouchableIcon,
} from '../../components/ui'
import { PostCard, ErrorBoundary } from '../../components'
import InfiniteCommentsFlashList, { InfiniteCommentsFlashListRef } from '../../components/InfiniteCommentsFlashList'
import { 
  StyleSheet,
  ScrollView,
  Dimensions, 
  View,
  ViewProps,
  Keyboard
} from 'react-native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useGetPost } from '../../api/queries/post'
import { useQueryClient } from '@tanstack/react-query'
import { useAddComment } from '../../api/interactions/comments'
import { useLocalSearchParams } from 'expo-router'
import React, { 
  useState,
  useEffect,
  useRef, 
  useMemo,
  forwardRef,
  Suspense 
} from 'react'
import { useThemeContext } from '../../context/theme'
import { useUserStore } from '../../stores/user'

import { summarizeQueryPagesResult } from '../../utils/queries.tsx'


const API_URL = process.env.EXPO_PUBLIC_API_URL

const PostDetailPage = () => {
  
  const { id } = useLocalSearchParams()
  const [status,setStatus] = useState<string>('loading')

  return (
    <ThemedView style={{flex:1,position:'relative'}}>
      <Suspense fallback={<ThemedActivityIndicator />}>
        <PostDetail id={id} onLoad={() => setStatus('success')}/>
      </Suspense>
      <CommentBoxContainer id={id} fetchStatus={status}/>
    </ThemedView>
  )
}


type PostDetailProps = {
  id:string,
  onLoad:() => void
}


const PostDetail = ({ id, onLoad }: PostDetailProps) => {
  
  const { data:post, status } = useGetPost(id)
  
  useEffect(() => {
    if(status === 'success'){
      onLoad()
    }
  },[status])
  
  return (
    <ScrollView>
      <PostImage uri={ post.image  } />
      <PostCard post={post} imageShown={false} />
      <InfiniteCommentsFlashList 
        contentContainerStyle={{
          paddingBottom:70,
          paddingTop:12
        }}
        postId={id} />
    </ScrollView>
  )
}

const PostImage = ({ uri }: { uri: string | null }) => {
  return uri? (
    <Image source={{ uri:uri }} style={styles.image} />
  ): null
}


type CommentBoxContainerProps = {
  id:string;
  fetchStatus:string
}


const CommentBoxContainer = ({ 
  id,
  fetchStatus
}: CommentBoxContainerProps ) => {
  
  const { profileURL } = useUserStore()
  const { theme } = useThemeContext()
  const { mutate: send, isPending, status } = useAddComment(id)
  const [comment,setComment] = useState<string | null>(null)
  
  const handleSendComment = () => {
    Keyboard.dismiss()
    if(!isPending && comment && fetchStatus === 'success'){
      send(comment)
    }
  }
  
  useEffect(() => {
    if(status === 'success'){
      setComment(null)
    }
  },[status])
  
  return (
    <ThemedView style={styles.commentBoxContainer}>
      <TouchableIcon 
        name={'folder-open'} 
        color={theme.colors.tint}
        size={28}/>
      <Avatar source={profileURL} size={36} />
      <FlatInput
        value={comment}
        onChangeText={setComment}
        placeholder={'comment'} 
        style={
          [
            styles.commentInput,
            { opacity: !comment? 0.7: 1}
          ]
        }/>
      <TouchableIcon 
        name={'send'} 
        color={theme.colors.tint}
        size={24}
        onPress={handleSendComment}/>
    </ThemedView>
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
    alignItems:'center',
    height:70
  },
  commentInput:{
    padding:12,
    fontSize:16,
    flex:1,
    overflow:'hidden'
  },
  commentSectionHeader:{
    fontSize:16,
    fontWeight:400,
    marginTop:20,
    marginBottom:12,
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

export default React.memo(PostDetailPage)