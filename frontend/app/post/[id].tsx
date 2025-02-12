import { useAddComment } from "@/api/interactions/comments"
import { useGetComment, useGetInfiniteComments } from "@/api/queries/comments"
import { useGetPost } from "@/api/queries/post"
import { Comment, CompoundPostCard } from "@/components"
import BottomInputBox, { BottomInputBoxRef } from "@/components/BottomInputBox"
import { SuspendedView, ThemedText, ThemedView } from "@/components/ui"
import { Post } from "@/types/post"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { FlashList } from "@shopify/flash-list"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useRef, useState } from "react"
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated"


const PostDetailPage = () => {

  const { id } = useLocalSearchParams()
  const { data: post, status: postStatus} = useGetPost(id as string)
  const { data: comments, status: commentStatus, fetchNextPage } = useGetInfiniteComments(id as string)
  const { mutate: comment } = useAddComment(id as string)
  const keyboard = useAnimatedKeyboard({ isStatusBarTranslucentAndroid: true })
  const inputRef = useRef<BottomInputBoxRef>()
  const [inputHeight, setinputHeight] = useState(0)

  const handleComment = (text:string | undefined) => {
    if(text){
      comment(text)
      inputRef.current && inputRef.current.clearInput()
    }
  }

  const rStyles = useAnimatedStyle(() => ({
    transform:[
      {
        translateY:-keyboard.height.value
      }
    ]
  }))

  const status = postStatus === commentStatus ? commentStatus || postStatus: 'pending' 


  return (
    <SuspendedView status={status} style={{flex:1}}>
      <Animated.View style={[{ flex: 1}, rStyles]}>
        <FlashList
          data={comments ? summarizeQueryPagesResult(comments): [] }
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Comment {...item} />}
          ListHeaderComponent={<StyledPostCard post={post!}/>}
          estimatedItemSize={20}
          onEndReached={fetchNextPage}
          contentContainerStyle={{ paddingBottom: inputHeight }}
        />
        <BottomInputBox 
          placeholder="add a comment...." 
          handleSend={handleComment}
          style={{ position: 'absolute', bottom: 0}}
          onLayout={e => setinputHeight(e.nativeEvent.layout.height)}
        />
      </Animated.View>
    </SuspendedView>
  )
}


const StyledPostCard = ({ post }: { post: Post }) => {
  return (
    <CompoundPostCard post={post!} >
      <CompoundPostCard.Image style={{paddingHorizontal:0}}/>
      <CompoundPostCard.Header style={{ paddingTop: 8 }}/>
      <CompoundPostCard.Caption />
      <CompoundPostCard.Actions style={{ paddingBottom: 8}}/>
    </CompoundPostCard>
  )
}


export default PostDetailPage
