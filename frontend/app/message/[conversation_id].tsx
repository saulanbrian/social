import { useSendMessage } from "@/api/interactions/chat"
import { useGetChats } from "@/api/queries/chat"
import { useGetConversation } from "@/api/queries/conversation"
import { ChatComponent } from "@/components"
import BottomInputBox, { BottomInputBoxRef }from "@/components/BottomInputBox"
import { SuspendedView, ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import ConversationContextProvider, { useConversationContext } from "@/context/conversation"
import { Chat } from "@/types/chat"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { FlashList } from "@shopify/flash-list"
import { useLocalSearchParams, useNavigation } from "expo-router"
import React, { useEffect, useRef, useState } from "react"
import { LayoutChangeEvent } from "react-native"
import Animated,{ measure, runOnJS, useAnimatedRef, useAnimatedScrollHandler } from "react-native-reanimated"

const ConversationPage = () => {
  
  const { conversation_id } = useLocalSearchParams()
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

  const { conversation : { id, other_end }} = useConversationContext()
  const {
    data:chats, 
    fetchNextPage: retrieveOlderMessages,
    status,
    isFetchingNextPage
  } = useGetChats(id)

  const chatsSum = chats? summarizeQueryPagesResult(chats): []

  return (
    <SuspendedView status={status} style={{flex:1}}>
      <FlashList 
        data={chatsSum}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { profile_picture, id: sender_id} = item.sender
          const messageType = other_end.id === sender_id? 'received': 'sent'
          return (
            <ChatComponent 
              messageType={messageType} 
              message={item.message} 
              sender_profile={profile_picture? API_URL + profile_picture: undefined}
            />
          )
        }}
        estimatedItemSize={50}
        inverted
        onEndReached={retrieveOlderMessages}
        ListFooterComponent={() => {
          return isFetchingNextPage && <ThemedActivityIndicator />
        }}
      />
    </SuspendedView>
  )
}

const MessageBox = ({
  onLayout
}:{
  onLayout:(e:LayoutChangeEvent) => void
}) => {

  const { conversation: { id }} = useConversationContext()
  const { mutate: send} = useSendMessage({ conversationId: id })
  const inputRef = useRef<BottomInputBoxRef>(null)
  
  const handleSend = () => {
    if(inputRef.current && inputRef.current.text?.trim()){
      send(inputRef.current.text)
      inputRef.current.clearInput()
    }
  }

  return (
    <BottomInputBox 
      ref={inputRef}
      placeholder="send a message..."
      handleSend={handleSend}
      onLayout={onLayout}
    />
  )
}


const API_URL = process.env.EXPO_PUBLIC_API_URL

export default ConversationPage