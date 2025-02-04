import { useSendMessage } from "@/api/interactions/chat"
import { useGetChats } from "@/api/queries/chat"
import { useGetConversation } from "@/api/queries/conversation"
import { useGetCurrentUser } from "@/api/queries/user"
import { ChatComponent, PendingMessage } from "@/components"
import BottomInputBox, { BottomInputBoxRef }from "@/components/BottomInputBox"
import { SuspendedView, ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import ConversationContextProvider, { useConversationContext } from "@/context/conversation"
import { useAuthenticatedWebSocket } from "@/hooks/socket"
import { Chat } from "@/types/chat"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { FlashList } from "@shopify/flash-list"
import { useQueryClient } from "@tanstack/react-query"
import { useLocalSearchParams, useNavigation } from "expo-router"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Alert, LayoutChangeEvent } from "react-native"
import Animated,{ measure, runOnJS, useAnimatedRef, useAnimatedScrollHandler } from "react-native-reanimated"

const WS_URL = process.env.EXPO_PUBLIC_WS_URL

const ConversationPage = () => {

  const { conversation_id } = useLocalSearchParams()

  const conversationId = useMemo(() => {
    return conversation_id
  },[conversation_id])

  const [inputBoxHeight,setInputBoxHeight] = useState<number>()

  return (
    <ConversationContextProvider conversationId={conversation_id as string}>
      <ThemedView style={{flex:1,paddingBottom:inputBoxHeight}}>
        <Messages/>
        <MessageBox onLayout={(e) => { setInputBoxHeight(e.nativeEvent.layout.height) }} />
      </ThemedView>
    </ConversationContextProvider>
  )
}


const Messages = () => {

  const { conversation : { id, other_end }, messageQuery, pendingMessages } = useConversationContext()
  const {
    data:chats, 
    fetchNextPage: retrieveOlderMessages,
    status,
    isFetchingNextPage,
    hasNextPage
  } = messageQuery

  const chatsSum = useMemo(() => {
    return chats? summarizeQueryPagesResult(chats): []
  }, [chats])


  return (
    <SuspendedView status={status} style={{flex:1}}>
      <FlashList 
        data={chatsSum}
        keyExtractor={(item,index) => `${item.id}_${index}` }
        renderItem={({ item, index}) => {
          const { profile_picture, id: sender_id} = item.sender
          const messageType = sender_id === other_end.id ? 'received': 'sent'
          return (
            <ChatComponent 
              messageType={messageType} 
              message={item.message} 
              sender_profile={profile_picture? API_URL + profile_picture: undefined}
              style={{ maxWidth: '80%'}}
            />
          )
        }}
        estimatedItemSize={50}
        inverted
        showsVerticalScrollIndicator={false}
        onEndReached={() => { 
          retrieveOlderMessages()          
        }}
        ListFooterComponent={() => {
          return isFetchingNextPage && <ThemedActivityIndicator />
        }}
      />
      
    </SuspendedView>
  )
}

const MessageBox = ({
  onLayout,
}:{
  onLayout:(e:LayoutChangeEvent) => void;
}) => {

  const { conversation: { id }, sendMessage, socket } = useConversationContext()
  const inputRef = useRef<BottomInputBoxRef>(null)

  return (
    <BottomInputBox 
      ref={inputRef}
      placeholder="send a message..."
      handleSend={(text) => {
        if(text && socket){
          sendMessage(text)
          inputRef.current?.clearInput()
        }
      }}
      onLayout={onLayout}
    />
  )
}


const API_URL = process.env.EXPO_PUBLIC_API_URL

export default ConversationPage