import { useSearchPosts, useSearchUser } from "@/api/queries/search"
import { Avatar, FlatInput, SuspendedView, ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import { useThemeContext } from "@/context/theme"
import useDebounce from "@/hooks/debounce"
import { useSearchStore, HistoryItem } from "@/stores/search"
import { Post } from "@/types/post"
import User from "@/types/user"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import React, { useState } from "react"
import { StyleSheet, View, ScrollView, Pressable } from "react-native"


const API_URL = process.env.EXPO_PUBLIC_API_URL


const SearchPage = () => {

  const [searchKey,setSearchKey] = useState<string>()
  const debouncedSearchKey = useDebounce(searchKey,1000)
  const router = useRouter()

  return (
    <ThemedView style={{flex:1}}>
      <SearchContainer value={searchKey} onChangeText={setSearchKey}/>

      <View style={{position:'relative'}}>
        <SearchHistory />
        <SearchSuggestions value={debouncedSearchKey}/>
      </View>

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
      <FlatInput value={value} onChangeText={onChangeText} style={styles.searchInput}/>
      <Ionicons name='search' color={theme.colors.tint} size={28} onPress={handlePress}/>
    </ThemedView>
  )
}


const SearchHistory = () => {

  const { history } = useSearchStore()

  return (
    <ScrollView>
      { history.map((item, i) => <SearchItemComponent item={item} key={i.toString()}/>) }
    </ScrollView>
  )
}


const SearchItemComponent = ({ item }: { item: HistoryItem }) => {

  const router = useRouter()
  const { addToHistory } = useSearchStore()

  const handlePress = () => {

    addToHistory(item)
    
    router.push({
      pathname:'/(tabs)/search/[keyword]',
      params: { keyword: item.type === 'post'? item.item.caption as string: item.item.username }
    })
  }
  
  return (
    <Pressable onPress={handlePress}>
      {
       item.type === 'post'? (
        <ThemedText>{ item.item.caption }</ThemedText>
       ): (
        <ThemedView style={{flexDirection:'row'}}>
          <Avatar source={API_URL as string + item.item.profile_picture || null}  size={28}/>
          <ThemedText>{item.item.username}</ThemedText>
        </ThemedView>
       )
      }
    </Pressable>
  )
}


const SearchSuggestions = ({ value }: { value: string | undefined }) => {

  
  const { data: posts, status: postSearchStatus, } = useSearchPosts(value)
  const { data: users, status: userSearchStatus } = useSearchUser(value)

  const userResults = users ? summarizeQueryPagesResult(users) : []
  const postResults = posts ? summarizeQueryPagesResult(posts) : []

  const status: 
  | 'success' 
  | 'pending' 
  | 'error' = userSearchStatus === postSearchStatus? userSearchStatus || postSearchStatus: 'pending'

  if(!value) return null

  return (
    <SuspendedView status={status} style={styles.suggestionBox}>
      <ScrollView>
        { postResults.map((post, i) => <SearchItemComponent item={({ item: post, type: 'post'})} key={i.toString()} /> )}
        {  userResults.map((user,i) => <SearchItemComponent item={({ item: user, type: 'user'})} key={i.toString()}/>)}
      </ScrollView>
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
  searchInput:{
    width:'84%',
    padding:8,
    borderRadius:4
  },
  suggestionBox:{
    position:'absolute',
    top:0,
    paddingLeft:16
  }
})


export default SearchPage