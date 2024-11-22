import { FlashList, FlashListProps } from '@shopify/flash-list'
import { ThemedText } from '../ui' 
import { TouchableOpacity } from 'react-native'
import Comment from '../Comment'

import { useGetInfiniteComments } from '../../api/queries/comments'
import { summarizeQueryPagesResult } from '../../utils/queries'
import { useThemeContext} from '../../context/theme'

type Props = FlashListProps & {
  postId: string
}

const InfiniteCommentsFlashList = ({postId,...props}:Props) => {
  
  const {
    data:comments, 
    status,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteComments(postId)
  
  const { theme } = useThemeContext()
  
  return !!comments? (
    <FlashList 
      data={summarizeQueryPagesResult(comments)}
      keyExtractor={(comment) => comment.id }
      renderItem={({ item: comment }) => {
        return <Comment {...comment} key={comment.id} />
      }}
      estimatedItemSize={200}
      { ...props }
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
      />
  ): isFetching && !isFetchingNextPage ? (
    <ThemedText>loading...</ThemedText>
  ): status === 'error' && (
    <ThemedText>an error has occured</ThemedText>
  )
}

export default InfiniteCommentsFlashList