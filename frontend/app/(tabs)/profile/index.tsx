import { Suspense } from "react"
import { FlatList, ScrollView, StyleSheet } from "react-native"
import { PostCard } from "@/components"
import { ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"

import { useGetInfiniteUserPosts } from "@/api/queries/post"
import { useUserStore } from "@/stores/user"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { AnimatedFlashList, FlashList } from "@shopify/flash-list"
import Animated, { FadeIn,  FadeInDown,  SlideInLeft,  SlideInRight,  SlideInUp, SlideOutUp } from "react-native-reanimated"
import { BaseRouter } from "@react-navigation/native"


export const ProfilePostsPage = () => {

  const { id } = useUserStore()

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <Posts userId={id as string}/>
    </Suspense>
  )
}

const Posts = ({ userId }:{ userId: string }) => {

  const { data: posts, fetchNextPage } = useGetInfiniteUserPosts(userId)

  return (
    <AnimatedFlashList 
      data={summarizeQueryPagesResult(posts)}
      keyExtractor={(item) => item.id}
      renderItem={({ index, item: post }) =>(
        <Animated.View entering={ FadeInDown.springify().duration(index + 1 * 2000) }>
          <PostCard post={post} />
        </Animated.View>

      )}
      estimatedItemSize={200}
      onEndReached={fetchNextPage}
    />
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop:4
  }
})

export default ProfilePostsPage;