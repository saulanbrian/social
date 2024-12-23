import { Suspense } from "react"
import { FlatList, ScrollView } from "react-native"
import { PostCard } from "@/components"
import { ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"

import { useGetInfiniteUserPosts } from "@/api/queries/post"
import { useUserStore } from "@/stores/user"
import { summarizeQueryPagesResult } from "@/utils/queries"


export const UserPosts = () => {

  const { id } = useUserStore()

  return (
    <ThemedView style={{backgroundColor:'red'}}>
      <Suspense fallback={<ThemedActivityIndicator />}>
        <Posts userId={id as string}/>
      </Suspense>
    </ThemedView>
  )
}

const Posts = ({ userId }:{ userId: string }) => {

  const { data: posts, fetchNextPage } = useGetInfiniteUserPosts(userId)

  return (
    <ScrollView style={{backgroundColor:'red'}}>
       {summarizeQueryPagesResult(posts).map(post => (<PostCard post={post} key={post.id}/>))}
      <ThemedText>asdhadahsgdh</ThemedText>
    </ScrollView>
  )
}


const TestValue = () => {
  
  return (
    <ThemedView style={{flex:1,backgroundColor:'white'}}>
      <ThemedText style={{fontSize:20}}>
        asdsa
      </ThemedText>
    </ThemedView>
  )
}

export default TestValue;