import { useGetChats } from "@/api/queries/chat"
import { useGetConversation } from "@/api/queries/conversation"
import useConversationChatUpdater from "@/api/updaters/chat"
import { AutoCenteredActivityIndicator } from "@/components"
import { useAuthenticatedWebSocket } from "@/hooks/socket"
import { Chat } from "@/types/chat"
import { Conversation } from "@/types/conversation"
import { infiniteQueryAppendResultAtTop, InfiniteQueryPage, summarizeQueryPagesResult, updateInfiniteQuerySingleResultById } from "@/utils/queries"
import { InfiniteData, UseInfiniteQueryResult, useQueryClient } from "@tanstack/react-query"
import { useNavigation } from "expo-router"
import React, { createContext, useContext, useEffect, useState } from "react"


const WS_URL = process.env.EXPO_PUBLIC_WS_URL

type ConversationContextType = {
  conversation:Conversation;
  messageQuery:UseInfiniteQueryResult<InfiniteData<InfiniteQueryPage<Chat>,unknown>,Error>;
  sendMessage:(text:string) => void;
  socket:WebSocket | null;
}

const ConversationContext = createContext<ConversationContextType | null>(null)

export const useConversationContext = () => {
  const context =  useContext(ConversationContext)
  if(!context) throw new Error('cannot use conversation context outside a conversation')
  return context
}

const ConversationContextProvider = ({ children, conversationId }: { children: React.ReactNode; conversationId: string }) => {

  const { data: conversation } = useGetConversation(conversationId)
  const messageQuery = useGetChats(conversationId)
  const { socket } = useAuthenticatedWebSocket(WS_URL! + `/conversation/${conversationId}`)
  const { pushChatToTop, updateConversationLastMessage}  = useConversationChatUpdater(conversationId)
  const navigation = useNavigation()
  const queryClient = useQueryClient()
 
  useEffect(() => {

    const blurListener = navigation.addListener('blur', () => {
      updateConversationLastMessage()
    })

    if(conversation){
      navigation.setOptions({
        headerTitle:conversation.other_end.username
      })
    }

    return () => {
      navigation.removeListener("blur",blurListener)
    }

  },[conversation])

  useEffect(() => {
    if(socket){
      socket.onmessage = (e) => {
        const data: Chat = JSON.parse(e.data)
        pushChatToTop(data)
      }
    }

    return () => {
      if(socket) socket.close()
    }
  }, [socket])

  

  const sendMessage = (text:string) => {
    if(socket){
      socket.send(JSON.stringify({
        message:text
      }))
    }
  }

  return conversation && messageQuery.data? ( 
    <ConversationContext.Provider value={{
      conversation,
      messageQuery,
      socket,
      sendMessage,
     }}>
      { children }
    </ConversationContext.Provider>
  ): <AutoCenteredActivityIndicator />
}

export default ConversationContextProvider