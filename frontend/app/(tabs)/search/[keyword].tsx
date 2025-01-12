import { useSearchPosts, useSearchUser } from "@/api/queries/search"
import { PostCard, UserPreviewCard } from "@/components"
import ListEmptyComponent from "@/components/ListEmptyComponent"
import { FlatInput, TabBarButton, ThemedText, ThemedView } from "@/components/ui"
import { useThemeContext } from "@/context/theme"
import { useSearchStore } from "@/stores/search"
import { Post } from "@/types/post"
import User from "@/types/user"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { FlashList } from "@shopify/flash-list"
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Pressable, StyleSheet, useWindowDimensions, FlatList, View } from "react-native"
import { SceneMap, TabView } from "react-native-tab-view"


const routes = [
  { key: 'all', title: 'results' },
  { key: 'post', title: 'post' },
  { key: 'user', title: 'user' }
]

const SearchResultsPage = () => {

  const navigation = useNavigation()
  const { history, addToHistory } = useSearchStore()
  const { keyword } = useLocalSearchParams()
  const { data: users } = useSearchUser(keyword as string)
  const { data: posts } = useSearchPosts(keyword as string)

  const layout = useWindowDimensions()
  const [index,setIndex] = useState(0)

  const userResults = useMemo(() => {
    return users? summarizeQueryPagesResult(users) : []
  },[users])

  const postResults = useMemo(() => {
    return posts? summarizeQueryPagesResult(posts) : []
  }, [posts])

  const allRresults = useMemo(() => {
    return [...userResults,...postResults]
  }, [postResults,userResults])

  const renderTabBar = useCallback(() => {
    return <TabBar routes={routes} indexSetter={setIndex} activeIndex={index}/>
  },[index])

  const renderScene = useMemo(() => (
    SceneMap({ 
      all:() => <AllResults results={[...userResults,...postResults]}/>,
      user:() => <UserResults results={userResults} />,
      post:() => <PostResults results={postResults} />
    })
  ),[postResults,userResults])

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle:`search results for ${keyword}`
    })
  })

  return (
    <TabView 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
    />
  )
}

const AllResults = ({ results }: { results: ( Post | User )[] }) => {
  return (
    <ThemedView style={{flex:1}}>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const hasUsername = item.hasOwnProperty('username')
          return hasUsername
            ? <UserPreviewCard user={item as User} />
            : <PostCard post={item as Post} style={{ borderRadius: 4 }}/>
        }}
        ItemSeparatorComponent={() => <View style={{height:2}} />}
        contentContainerStyle={{paddingHorizontal:4}}
      />
    </ThemedView>
  )
}

const UserResults = React.memo(({ results } : { results: User[] }) => {
  return (
    <ThemedView style={{flex:1}}>
      <FlashList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item: user }) => {
          return <UserPreviewCard user={user}/>
        }}
        estimatedItemSize={77}
        contentContainerStyle={{
          paddingHorizontal:4, 
        }}
      />
    </ThemedView>
  )
})

const PostResults = React.memo(({ results }: { results: Post[] }) => {
  return (
    <ThemedView style={{flex:1}}>
      <FlashList 
        data={results}
        keyExtractor={item => `post_${item.id}`}
        renderItem={({ item: post }) => {
          return <PostCard post={post} />
        }}
        estimatedItemSize={280}
      />
    </ThemedView>
  )
})

const TabBar = ({
  indexSetter, 
  routes,
  activeIndex
}:{ 
  indexSetter: React.Dispatch<React.SetStateAction<number>>,
  routes:{ key: string, title: string }[];
  activeIndex:number
}) => {

  const { theme } = useThemeContext()


  return (
  <ThemedView style={styles.tabBar}>
    { 
      routes.map(({ key, title }, i) => {
        return (
          <TabBarButton 
            key={`${key}_${i}`}
            label={title}
            onPress={() => indexSetter(i)}
            active={activeIndex === i}
          />
        )
      })
    }
  </ThemedView>
  )
}


const styles = StyleSheet.create({
  tabBar:{
    flexDirection:'row',
    padding:12,
    gap:8
  },
})


export default SearchResultsPage