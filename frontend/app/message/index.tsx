import { useGetConversations } from "@/api/queries/conversation"
import { useGetFollowedUser } from "@/api/queries/user"
import { ConversationCard } from "@/components"
import { Avatar, FlatInput, SuspendedView, ThemedText, ThemedView } from "@/components/ui"
import useDebounce from "@/hooks/debounce"
import { Conversation } from "@/types/conversation"
import User from "@/types/user"
import { InfiniteQueryPage, summarizeQueryPagesResult } from "@/utils/queries"
import { FlashList } from "@shopify/flash-list"
import { useQueryClient } from "@tanstack/react-query"
import React, { useCallback, useEffect, useState } from "react"
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { FlatList, Pressable, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Animated, { interpolate, runOnJS, SharedValue, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"

const ConversationListPage = () => {

  const { data: users , status: userStatus} = useGetFollowedUser()
  const { data: conversations, status: conversationStatus  } = useGetConversations()
  
  const status  = userStatus === conversationStatus
    ? userStatus || conversationStatus
    : 'pending'

  const renderHeader = useCallback(() => {
    return <UserList users={users? summarizeQueryPagesResult(users): [] }/>
  },[users])

  return (
    <ThemedView style={{flex:1}}>
      <SearchContainer/>
      <SuspendedView status={status}> 
        <ConversationList 
          conversations={conversations? summarizeQueryPagesResult(conversations): []}
          renderHeader={renderHeader}
        />
      </SuspendedView>
    </ThemedView>
  )
}


const SearchContainer = () => {

  const [searchKey,setSearchKey] = useState<string>()

  return (
    <Animated.View style={[styles.searchContainer]}>
      <FlatInput 
        numberOfLines={1} 
        style={styles.input} 
        value={searchKey} 
        onChangeText={setSearchKey}
        placeholder="search for user..."/>
    </Animated.View>
  )
}


const UserList = React.memo(({ users } : { users: User[] } ) => {

  return users.length >= 1 && (
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
    />
  )
})


const ConversationList = ({ 
  conversations,
  renderHeader,
}: { 
  conversations: Conversation[],
  renderHeader:() => JSX.Element,
}) => {

  return (
    <ThemedView style={{height:'100%'}}>
      <FlashList
        ListHeaderComponent={renderHeader} 
        data={conversations}
        keyExtractor={(conversation,i) => i.toString()}
        renderItem={({ item }) => <ConversationCard conversation={item} />}
        contentContainerStyle={{padding:4}}
        estimatedItemSize={72}
      />
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  input:{
    borderRadius:20,
    padding:12,
    fontSize:16,
  },
  searchContainer:{
    padding:12,
  },
  userListContainer:{
    flexDirection:'row',
  }
})

export default ConversationListPage