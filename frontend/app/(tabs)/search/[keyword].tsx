import { useSearchPosts, useSearchUser } from "@/api/queries/search"
import { ThemedText, ThemedView } from "@/components/ui"
import { useThemeContext } from "@/context/theme"
import { Post } from "@/types/post"
import User from "@/types/user"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router"
import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, useWindowDimensions } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"


const routes = [
  { key: 'all', title: 'all' },
  { key: 'post', title: 'post' },
  { key: 'user', title: 'user' }
]

const SearchResultsPage = () => {

  const navigation = useNavigation()
  const { keyword } = useLocalSearchParams()
  const { data: users } = useSearchUser(keyword as string)
  const { data: posts } = useSearchPosts(keyword as string)

  const layout = useWindowDimensions()
  const [index,setIndex] = useState(0)

  const userResults = users? summarizeQueryPagesResult(users) : []
  const postResults = posts? summarizeQueryPagesResult(posts) : []

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle:`search results for ${keyword}`
    })
  })

  return (
    <TabView 
      navigationState={({ index, routes })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderScene={SceneMap({ 
        all:() => <AllResults results={[...userResults,...postResults]}/>,
        user:() => <UserResults results={userResults} />,
        post:() => <PostResults results={postResults} />
      })}
      renderTabBar={(props) => <CustomTabBar routes={routes} indexSetter={setIndex} activeIndex={index}/>}
    />
  )
}

const AllResults = ({ results }: { results: ( Post | User )[] }) => {
  return (
    <ThemedView>
      <ThemedText>all</ThemedText>
    </ThemedView>
  )
}

const UserResults = ({ results } : { results: User[] }) => {
  return (
    <ThemedView>
      <ThemedText>users</ThemedText>
    </ThemedView>
  )
}

const PostResults = ({ results }: { results: Post[] }) => {
  return (
    <ThemedView>
      <ThemedText>posts</ThemedText>
    </ThemedView>
  )
}

const CustomTabBar = ({
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
          <Pressable onPress={() => indexSetter(i)} key={key} style={({ pressed }) => {
            return [
              styles.tab,
              { 
                backgroundColor:activeIndex === i? theme.colors.primary : undefined,
                borderColor:theme.colors.text
              },
            ]
          }}>
            <ThemedText>{ title }</ThemedText>
          </Pressable>
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
  tab:{
    padding:4,
    borderWidth:1,
    borderRadius:4
  }
})


export default SearchResultsPage