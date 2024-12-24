import { useGetInfiniteUserPosts } from "@/api/queries/post"
import { PostCard } from "@/components"
import { ThemedActivityIndicator, ThemedText } from "@/components/ui"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { AnimatedFlashList } from "@shopify/flash-list"
import { useLocalSearchParams } from "expo-router"
import { Suspense } from "react"
import Animated, { FadeInDown } from "react-native-reanimated"

const UserPostsPage = () => {
  const { user } = useLocalSearchParams()
  return ( 
    <Suspense fallback={<ThemedActivityIndicator />}>
      <Posts userId={user as string} />
    </Suspense>
  )
}

const Posts = ({ userId }: { userId: string  }) => {

  const { data: posts } = useGetInfiniteUserPosts(userId)

  return (
    <AnimatedFlashList
      data={summarizeQueryPagesResult(posts)}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index}) => {
        return (
          <Animated.View entering={FadeInDown.duration(index + 1 * 2000).springify()}>
            <PostCard post={item} />
          </Animated.View>
        )
      }}
      estimatedItemSize={200}
      ListEmptyComponent={ListEmptyComponent}
    />
  )
}

const ListEmptyComponent = () => {
  return (
    <ThemedText>this user doesnt have any post yet</ThemedText>
  )
}

export default UserPostsPage