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
import { StyleSheet, View, ScrollView, Pressable, Modal, Dimensions, TouchableOpacity, Text} from "react-native"
import { useAnimatedRef, useSharedValue } from "react-native-reanimated"


const API_URL = process.env.EXPO_PUBLIC_API_URL


const SearchPage = () => {

  const [searchKey,setSearchKey] = useState<string>()
  const debouncedSearchKey = useDebounce(searchKey,1000)
  const router = useRouter()

  return (
    <ThemedView style={styles.container}>
      <SearchContainer value={searchKey} onChangeText={setSearchKey} />
      { searchKey?.trim() ? <SearchSuggestions value={debouncedSearchKey?.trim()} /> : <SearchHistory />}
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

  const { addToHistory, history} = useSearchStore()
  const router = useRouter()
  const { theme } = useThemeContext()

  const handlePress = () => {    
    if(value?.trim()){

      if(!history.some(item => item === value)){
        addToHistory(value)
      }
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
      <Ionicons name='search' color={theme.colors.tint} size={24} onPress={handlePress}/>
    </ThemedView>
  )
}


const SearchHistory = () => {

  const { history, clearHistory } = useSearchStore()

  return (
    <ThemedView style={styles.searchHistory}>
      { history.length >=1 ? (
          <TouchableOpacity onPress={() => clearHistory()}>
            <Text style={styles.clearButton}>clear</Text>
          </TouchableOpacity>
        ):(
          <ThemedText style={{ textAlign:'center', paddingRight:48}}>
            your search history will appear here
          </ThemedText>
        )
      }
      <FlashList 
        data={history}
        keyExtractor={(_,i) => i.toString()}
        renderItem={({ item }) => (
          <SearchItemComponent 
            item={item} 
            style={{ marginVertical: typeof item === 'string'? 4: undefined }} />
        )}
        estimatedItemSize={72}
        contentContainerStyle={styles.historyList}
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
    ...userResults,
    ...postResults.map(post => post.caption as string),
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
        keyExtractor={(_,i) => i.toString()}
        renderItem={({ item }) => <SearchItemComponent item={item}/> }
        ListEmptyComponent={() => (
          <ThemedText style={{margin:12,marginLeft:8}}>no results found</ThemedText>
        )}
        estimatedItemSize={72}
        contentContainerStyle={styles.suggestionList}
      /> 
    </SuspendedView>
  )
}


const styles = StyleSheet.create({
  clearButton:{
    color:'red',
    textAlign:"right",
    marginLeft:'auto',
    marginVertical:8,
    paddingRight:20
  },
  container:{
    flex:1,
    paddingVertical:16,
    // paddingHorizontal:12
  },
  historyList:{
    paddingRight:12,
    paddingLeft:8
  },
  searchContainer:{
    flexDirection:'row',
    gap:8,
    alignItems:'center',
    width:'100%',
    paddingHorizontal:12
  },
  searchHistory:{
    flex:1,
  },
  searchInput:{
    padding:12,
    fontSize:16,
    borderRadius:4,
    width:'88%'
  },
  searchInputContainer:{
    maxWidth:'84%',
    flex:1,
    overflow:'hidden'
  },
  suggestionBox:{
    flex:1,
  },
  suggestionList:{
    paddingRight:12,
    paddingLeft:8
  }
})


export default SearchPage