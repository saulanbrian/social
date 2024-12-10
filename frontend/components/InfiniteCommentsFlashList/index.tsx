import React, { useMemo } from 'react'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import { ThemedText, ThemedView } from '../ui' 
import { TouchableOpacity } from 'react-native'
import Comment from '../Comment'
import CommentType from '../../types/comment'

import { useGetInfiniteComments } from '../../api/queries/comments'
import { summarizeQueryPagesResult } from '../../utils/queries'
import { useRouter } from 'expo-router'
import { useThemeContext} from '../../context/theme'


type Props = FlashListProps & {
  postId: string
}

export type InfiniteCommentsFlashListRef = {
  comments:CommentType[],
  isLoading:boolean
}

const InfiniteCommentsFlashList = React.memo(
  React.forwardRef<InfiniteCommentsFlashListRef,FlashListProps>(
  (props,ref) => {
  
  const { postId, ...restProps } = props
  
  const {
    data, 
    status,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteComments(postId)
  
  const { theme } = useThemeContext()
  const router = useRouter()
  
  const comments = useMemo(() => data? summarizeQueryPagesResult(data): [],[data,postId])
  
  React.useImperativeHandle(ref,() => {
    return { comments, isLoading: isFetching } 
  })
  
  const handlePress = (id) => {
    router.push(`/post/${postId}/comments/${id}`)
  }
  
  
  return !!comments? (
    <FlashList 
      data={comments}
      keyExtractor={(comment) => comment.id }
      renderItem={({ item: comment }) => {
        return (
          <TouchableOpacity onPress={() => handlePress(comment.id)}>
            <Comment {...comment} key={comment.id} />
          </TouchableOpacity>
        )
      }}
      estimatedItemSize={200}
      { ...restProps }
      ListFooterComponent={() => {
        return hasNextPage && (
        <TouchableOpacity onPress={fetchNextPage}>
          <ThemedText style={{
            fontSize:16,
            color:theme.colors.tint,
            margin:8
          }}>
            show more
          </ThemedText>
        </TouchableOpacity>
        )
      }}
      ListEmptyComponent={() => {
        return (
          <ThemedView style={{height:'100%',justifyContent:'center'}}>
            <ThemedText style={{alignSelf:'center',opacity:0.6}}>
              no comments yet
            </ThemedText>
          </ThemedView>
        )
      }}
      />
  ): isFetching && !isFetchingNextPage ? (
    <ThemedText>loading...</ThemedText>
  ): status === 'error' && (
    <ThemedText>an error has occured</ThemedText>
  )
}))

export default React.memo(InfiniteCommentsFlashList)