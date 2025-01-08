import { useSearchPosts, useSearchUser } from "@/api/queries/search"
import { SearchItemComponent } from "@/components"
import { Avatar, FlatInput, SuspendedView, ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import { useThemeContext } from "@/context/theme"
import useDebounce from "@/hooks/debounce"
import { useSearchStore } from "@/stores/search"
import { Post } from "@/types/post"
import { SearchItem } from "@/types/search"
import User from "@/types/user"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { Ionicons } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import { useNavigation, useRouter } from "expo-router"
import React, { useState } from "react"
import { StyleSheet, View, ScrollView, Pressable, Modal, Dimensions } from "react-native"
import { useAnimatedRef, useSharedValue } from "react-native-reanimated"


const API_URL = process.env.EXPO_PUBLIC_API_URL


const SearchPage = () => {

  const [searchKey,setSearchKey] = useState<string>()
  const debouncedSearchKey = useDebounce(searchKey,1000)
  const router = useRouter()

  return (
    <ThemedView style={{flex:1}}>
      <SearchContainer value={searchKey} onChangeText={setSearchKey} />
      { searchKey ? <SearchSuggestions value={searchKey} /> : <SearchHistory />}
    </ThemedView>
  )
}


const SearchContainer = ({
  value, 
  onChangeText
}:{ 
  value: string | undefined, 
  onChangeText:React.Dispatch<React.SetStateAction<string | undefined>>
}) => {

  const router = useRouter()
  const { theme } = useThemeContext()

  const handlePress = () => {
    if(value){
      router.push({
        pathname:'/search/[keyword]',
        params:{ keyword: value }
      })
    }
  }

  return (
    <ThemedView style={styles.searchContainer}>
      <FlatInput 
        value={value} 
        onChangeText={onChangeText} 
        style={styles.searchInput}
        placeholder="what's on your mouth..."/>
      <Ionicons name='search' color={theme.colors.tint} size={28} onPress={handlePress}/>
    </ThemedView>
  )
}


const SearchHistory = () => {

  const { history } = useSearchStore()

  return (
    <ThemedView style={styles.searchHistory}>
      <FlashList 
        data={history}
        keyExtractor={({ item, type },i) => `history_${type}_${item.id}_${i}`}
        renderItem={({ item }) => {
          return <SearchItemComponent item={item} />
        }}
        estimatedItemSize={72}
      />
    </ThemedView>
  )
}


const SearchSuggestions = ({ value }: { value: string | undefined; }) => {

  const { theme } = useThemeContext()

  const { data: posts, status: postSearchStatus, } = useSearchPosts(value)
  const { data: users, status: userSearchStatus } = useSearchUser(value)

  const userResults = users ? summarizeQueryPagesResult(users) : []
  const postResults = posts ? summarizeQueryPagesResult(posts) : []

  const items: SearchItem[] = [
    ...userResults.map(result => ({ type: 'user', item: result }) as SearchItem),
    ...postResults.map(result => ({ type: 'post', item: result }) as SearchItem)
  ]

  const status: 
  | 'success' 
  | 'pending' 
  | 'error' = userSearchStatus === postSearchStatus? userSearchStatus || postSearchStatus: 'pending'

  if(!value) return null

  return (
    <SuspendedView status={status} style={styles.suggestionBox}>
      <FlashList 
        data={items}
        keyExtractor={({ item, type }) => `${type}_${item.id}`}
        renderItem={({ item }) => <SearchItemComponent item={item}/> }
        ListEmptyComponent={() => (
          <ThemedText>no results found</ThemedText>
        )}
        estimatedItemSize={72}
      /> 
    </SuspendedView>
  )
}



const styles = StyleSheet.create({
  searchContainer:{
    flexDirection:'row',
    padding:16,
    gap:8,
    alignItems:'center',
  },
  searchHistory:{
    flex:1,
    marginHorizontal:8
  },
  searchInput:{
    width:'84%',
    padding:12,
    fontSize:16,
    borderRadius:4
  },
  suggestionBox:{
    flex:1,
    marginHorizontal:8
  }
})


export default SearchPage