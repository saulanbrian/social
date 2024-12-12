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


type Props = Omit<FlashListProps<unknown>,'data' | 'renderItem'> & {
  postId: string
}

export type InfiniteCommentsFlashListRef = {
  comments:CommentType[],
  isLoading:boolean
}

const InfiniteCommentsFlashList = React.memo(
  React.forwardRef<InfiniteCommentsFlashListRef,Props>(
    (props,ref) => {
  
  const { postId,...restProps } =  props
  
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
    
  React.useImperativeHandle(ref,() => {
    return { comments:summarizeQueryPagesResult(data), isLoading: isFetching } 
  })
  
  
  
  return (
    <FlashList 
      data={summarizeQueryPagesResult(data)}
      keyExtractor={(comment) => comment.id }
      renderItem={({ item: comment }) => <Comment {...comment} key={comment.id} /> }
      estimatedItemSize={200}
      { ...restProps }
      ListFooterComponent={() => {
        return hasNextPage && (
          <TouchableOpacity onPress={() => fetchNextPage()}>
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
  )
}))

export default React.memo(InfiniteCommentsFlashList)