import { useSearchPosts, useSearchUser } from "@/api/queries/search"
import { ThemedText, ThemedView } from "@/components/ui"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router"
import { useEffect } from "react"

const SearchResultsPage = () => {

  const navigation = useNavigation()
  const { keyword } = useLocalSearchParams()
  const { data: users } = useSearchUser(keyword as string)
  const { data:posts } = useSearchPosts(keyword as string)

  // useEffect(() => {
  //   if(posts){
  //     const postsResults = summarizeQueryPagesResult(posts)
  //     console.log('posts: ',postsResults);
      
  //   }
  //   if(users){
  //     const usersResults = summarizeQueryPagesResult(users)
  //     console.log('users: ',usersResults);
      
  //   }

  // },[posts,users])

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle:`search results for ${keyword}`
    })
  })

  return (
    <ThemedView>
      <ThemedText>these are the results</ThemedText>
    </ThemedView>
  )
}

export default SearchResultsPage