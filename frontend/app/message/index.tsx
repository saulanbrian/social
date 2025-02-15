import { useGetConversations } from "@/api/queries/conversation"
import { useSearchUser } from "@/api/queries/search"
import { useGetFollowedUser } from "@/api/queries/user"
import { ConversationCard, SearchItemComponent } from "@/components"
import { Avatar, FlatInput, SuspendedView, ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import MessageContextProvider, { useMessageAppContext,  } from "@/context/message"
import SearchContextProvider, { useSearchContext } from "@/context/search"
import { useThemeContext } from "@/context/theme"
import useDebounce from "@/hooks/debounce"
import { Conversation } from "@/types/conversation"
import { SearchItem } from "@/types/search"
import User from "@/types/user"
import { InfiniteQueryPage, summarizeQueryPagesResult } from "@/utils/queries"
import { FlashList } from "@shopify/flash-list"
import { useQueryClient } from "@tanstack/react-query"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native"
import { FlatList, Pressable, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Animated, { FadeInDown, FadeInRight, FadeInUp, interpolate, measure, runOnJS, SharedValue, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"


const ConversationListPage = () => {

  const { theme } = useThemeContext()
  const { searchKey } = useSearchContext()
  const { setHeaderHeight, scrollOffsetY} = useMessageAppContext()
  

  const headerStyles = useAnimatedStyle(() => ({
    transform:[
      {
        translateY: withSpring(-scrollOffsetY.value,{ damping: 100, })
      }
    ],
    backgroundColor:theme.colors.background.default,
    position:'absolute',
    width:'100%',
    zIndex:1
  }))


  return (
    <ThemedView style={{flex:1}}> 

      <Animated.View style={headerStyles} onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}>
        <SearchContainer />
        { !searchKey && <FollowingList />}
      </Animated.View>
      { searchKey? <SearchResults />: <ConversationList />}
    </ThemedView>
  )
}


const SearchContainer = () => {

  const { searchKey, setSearchKey } = useSearchContext()
  const { theme } = useThemeContext()

  return (
    <Animated.View style={[styles.searchContainer,{ backgroundColor: theme.colors.background.default }]}>
      <FlatInput 
        numberOfLines={1} 
        style={styles.input} 
        value={searchKey} 
        onChangeText={setSearchKey}
        placeholder="search"/>
    </Animated.View>
  )
}


const FollowingList = () => {

  const { data, status, fetchNextPage } = useGetFollowedUser() 

  const users = data? summarizeQueryPagesResult(data): []

  return status === 'success' && users.length >= 1 && (
    <Animated.View entering={ FadeInUp }>
      <FlashList
        data={users}
        keyExtractor={(item,i)=> i.toString()}
        renderItem={({ item }) => (
          <Avatar source={item.profile_picture || null} size={60} style={{ marginRight: 4 }}/>
        )}
        horizontal
        estimatedItemSize={65}
        contentContainerStyle={{paddingHorizontal:8}}
        showsHorizontalScrollIndicator={false}
        onEndReached={fetchNextPage}
      />
    </Animated.View>
  )
}


const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<any>)

const ConversationList = () => {

  const { data, status, fetchNextPage } = useGetConversations()
  const { headerHeight, scrollOffsetY, scrollHandlerToAnimatedHeader } = useMessageAppContext()

  const conversations = data ? summarizeQueryPagesResult(data) : []
  
  return (
    <SuspendedView style={{flex:1}} status={status}>
      <AnimatedFlashList
        data={conversations}
        keyExtractor={(conversation,i) => i.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInRight.duration((index + 1) * 200 )} >
            <ConversationCard conversation={item} />
          </Animated.View>
        )}
        contentContainerStyle={{paddingTop:headerHeight}}
        estimatedItemSize={72}
        onScroll={scrollHandlerToAnimatedHeader}
        onEndReached={fetchNextPage}
      />
    </SuspendedView>
  )
}

const SearchResults = () => {

  const { searchKey } = useSearchContext()
  const debouncedSearchKey = useDebounce(searchKey,1000)
  const { data, status, fetchNextPage } = useSearchUser(debouncedSearchKey)
  const { headerHeight, scrollHandlerToAnimatedHeader } = useMessageAppContext()
  
  const results = data ? summarizeQueryPagesResult(data): []

  return (
    <SuspendedView 
      status={status} 
      style={[ status === 'pending'? { paddingTop: headerHeight }: {}, { flex: 1 }]}>
      <AnimatedFlashList 
        data={results}
        keyExtractor={(item, i)=> `${item.id}_${i.toString()}`}
        renderItem={({ item }) => <SearchItemComponent item={item}/>}
        estimatedItemSize={24}
        onScroll={scrollHandlerToAnimatedHeader}
        contentContainerStyle={{ paddingTop: headerHeight }}
        ListEmptyComponent={<ThemedText>found none unfortunately</ThemedText>}
        onEndReached={fetchNextPage}
      />
    </SuspendedView>
  )
}


const styles = StyleSheet.create({
  header:{
    position:'absolute',
    width:'100%'
  },
  input:{
    borderRadius:20,
    padding:12,
    fontSize:16,
  },
  resultContainer:{
    flex:1
  },
  searchContainer:{
    padding:12,
  },
  userListContainer:{
    flexDirection:'row',
  }
})

export default function Page(){

  return (
    <MessageContextProvider>
      <SearchContextProvider searchItemPressHandler={(item:SearchItem) => {}}>
        <ConversationListPage />
      </SearchContextProvider>
    </MessageContextProvider>
  )
}