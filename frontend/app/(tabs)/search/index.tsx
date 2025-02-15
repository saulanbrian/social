import { useSearchPosts, useSearchUser } from "@/api/queries/search"
import { SearchItemComponent } from "@/components"
import { Avatar, FlatInput, SuspendedView, ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import SearchContextProvider, { useSearchContext } from "@/context/search"
import { useThemeContext } from "@/context/theme"
import useDebounce from "@/hooks/debounce"
import { useSearchStore } from "@/stores/search"
import { Post } from "@/types/post"
import { SearchItem } from "@/types/search"
import User from "@/types/user"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { Ionicons } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import { Href, useNavigation, useRouter } from "expo-router"
import React, { useState } from "react"
import { StyleSheet, View, ScrollView, Pressable, Modal, Dimensions, TouchableOpacity, Text} from "react-native"
import { useAnimatedRef, useSharedValue } from "react-native-reanimated"


const API_URL = process.env.EXPO_PUBLIC_API_URL


const PageWrapper = () => {

  const router = useRouter()
  const { history, addToHistory } = useSearchStore()

  const handleSearchItemPress = (item:SearchItem) => {

    const path:Href = typeof item === 'string' 
      ? { pathname:'/search/[keyword]', params: { keyword: item }}
      : { pathname:'/[user]',params: { user: item.id }}

    router.push(path)

    if(!history.some(historyItem => historyItem === item)){
      addToHistory(item)
    }
    
  }

  return (
    <SearchContextProvider  searchItemPressHandler={handleSearchItemPress}>
      <SearchPage />
    </SearchContextProvider>
  )
}

const SearchPage = () => {

  const { searchKey } = useSearchContext()

  return (
    <ThemedView style={styles.container}>
      <SearchContainer />
      { searchKey?.trim() ? <SearchSuggestions /> : <SearchHistory />}
    </ThemedView>
  )
}

const SearchContainer = () => {

  const { addToHistory, history} = useSearchStore()
  const { searchKey, setSearchKey } = useSearchContext()
  const router = useRouter()
  const { theme } = useThemeContext()

  const handlePress = () => {    
    if(searchKey?.trim()){

      if(!history.some(item => item === searchKey)){
        addToHistory(searchKey)
      }

      router.push({
        pathname:'/search/[keyword]',
        params:{ keyword: searchKey }
      })
    }
  }

  return (
    <ThemedView style={styles.searchContainer}>
      <FlatInput 
        value={searchKey} 
        onChangeText={setSearchKey} 
        style={styles.searchInput}
        placeholder="what's on your mouth..."/>
      <Ionicons name='search' color={theme.colors.tint} size={24} onPress={handlePress}/>
    </ThemedView>
  )
}


const SearchHistory = () => {

  const { history, clearHistory } = useSearchStore()
  const { searchItemPressHandler } = useSearchContext()

  return (
    <ThemedView style={styles.searchHistory}>
      <ClearHistoryButton />
      <FlashList 
        data={history}
        keyExtractor={(_,i) => i.toString()}
        renderItem={({ item }) => (
          <SearchItemComponent 
            item={item} 
            style={{ marginVertical: typeof item === 'string'? 4: undefined }} 
            onPress={() => searchItemPressHandler(item)}
          />
        )}
        estimatedItemSize={72}
        contentContainerStyle={styles.historyList}
      />
    </ThemedView>
  )
}

const ClearHistoryButton = () => {
  
  const { history, clearHistory } = useSearchStore()

  return history.length >= 1 && (
    <TouchableOpacity onPress={() => clearHistory()} style={styles.clearButton}>
      <Text style={{ color: 'red'}}>clear</Text>
    </TouchableOpacity>
  )
}


const SearchSuggestions = () => {

  const { theme } = useThemeContext()
  const { searchKey, searchItemPressHandler } = useSearchContext()
  const debouncedSearchKey = useDebounce(searchKey,1000)
  const { data: posts, status: postSearchStatus, } = useSearchPosts(debouncedSearchKey)
  const { data: users, status: userSearchStatus } = useSearchUser(debouncedSearchKey)
  const router = useRouter()

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

  if(!searchKey) return null

  return (
    <SuspendedView status={status} style={styles.suggestionBox}>
      <FlashList 
        data={items}
        keyExtractor={(_,i) => i.toString()}
        renderItem={({ item }) => <SearchItemComponent item={item} onPress={() => searchItemPressHandler(item)}/> }
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
    alignSelf:'flex-end',
    paddingRight:20,
    marginVertical:8
  },
  container:{
    flex:1,
    paddingVertical:16,
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


export default PageWrapper