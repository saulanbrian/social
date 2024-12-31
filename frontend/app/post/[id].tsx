import { 
  ThemedText, 
  ThemedView,
  ThemedActivityIndicator,
  Avatar,
  Card,
  FlatInput,
  TouchableIcon,
} from '@/components/ui'
import { PostCard, ErrorBoundary, AutoCenteredActivityIndicator } from '@/components'
import BottomInputBox, { BottomInputBoxRef } from '@/components/BottomInputBox'
import InfiniteCommentsFlashList, { InfiniteCommentsFlashListRef } from '@/components/InfiniteCommentsFlashList'
import { 
  StyleSheet,
  ScrollView,
  Dimensions, 
  View,
  ViewProps,
  Keyboard,
  KeyboardAvoidingView,
  NativeEventEmitter,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
  useCallback,
  Suspense 
} from 'react'
import { useThemeContext } from '../../context/theme'
import { useUserStore } from '../../stores/user'

import { summarizeQueryPagesResult } from '@/utils/queries'


const API_URL = process.env.EXPO_PUBLIC_API_URL

const PostDetailPage = () => {
  
  const { id } = useLocalSearchParams()
  const [status,setStatus] = useState<string>('loading')

  return (
    <ThemedView style={{flex:1,position:'relative'}}>
      <Suspense fallback={<AutoCenteredActivityIndicator />}>
        <PostDetail id={id as string } onLoad={() => setStatus('success')}/>
      </Suspense>
      <CommentBoxContainer id={id as string} fetchStatus={status}/>
    </ThemedView>
  )
}


type PostDetailProps = {
  id:string,
  onLoad:() => void
}


const PostDetail = ({ id, onLoad }: PostDetailProps) => {
  
  const { data:post, status } = useGetPost(id)
  const [keyboardHeight,setKeyboardHeight] = useState<number>(0)
  const [scrollHeight,setScrollHeight] = useState<number>(0)
  const scrollRef = useRef<ScrollView | null>(null)
  
  useEffect(() => {
    if(status === 'success'){
      onLoad()
    }
  },[status])
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height)
    })
    
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', e => {
      setKeyboardHeight(0)
    })
    
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  },[])
  
  useEffect(() => {
    if(scrollRef.current){ 
      scrollRef.current.scrollTo({ y: scrollHeight + keyboardHeight  })
    }
  },[keyboardHeight])

  const handleMomentumScrollEnd = (e:NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollHeight(e.nativeEvent.contentOffset.y)
  }
  
  return (
    <ScrollView 
      ref={scrollRef}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      >
      <PostImage uri={ post.image  } />
      <PostCard post={post} imageShown={false} />
      <Suspense fallback={<ThemedActivityIndicator />}>
        <InfiniteCommentsFlashList 
          contentContainerStyle={{
            paddingTop:12
          }}
          postId={id} />
      </Suspense>
      <View style={{height:70}} />
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
  
  const { mutate: send, isPending, status } = useAddComment(id)
  const commentRef = useRef<BottomInputBoxRef | null>(null)
  
  const handleSendComment = () => {
    Keyboard.dismiss()
    if(!isPending && !!commentRef.current?.text && fetchStatus === 'success'){
      send(commentRef.current.text)
    }
  }
  
  useEffect(() => {
    if(status === 'success'){
      commentRef.current?.clearInput()
    }
  },[status])
  
  return (
    <BottomInputBox 
      placeholder={'comment'} 
      ref={commentRef}
      handleSend={handleSendComment}/>
  )
}

const styles = StyleSheet.create({
  container:{
    minHeight:Dimensions.get('window').height,
  },
  commentSectionHeader:{
    fontSize:16,
    fontWeight:400,
    marginTop:20,
    marginBottom:12,
    marginLeft:8
  },
  image:{
    aspectRatio:1,
  },
  indicator:{
    flex:1,
    alignSelf:'center'
  },
  
})

export default React.memo(PostDetailPage)