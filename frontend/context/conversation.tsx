import { useGetChats } from "@/api/queries/chat"
import { useGetConversation } from "@/api/queries/conversation"
import { AutoCenteredActivityIndicator } from "@/components"
import { Chat } from "@/types/chat"
import { Conversation } from "@/types/conversation"
import { InfiniteQueryPage, summarizeQueryPagesResult } from "@/utils/queries"
import { InfiniteData } from "@tanstack/react-query"
import { useNavigation } from "expo-router"
import React, { createContext, useContext, useEffect } from "react"

type ConversationContextType = {
  conversation:Conversation;
  // chats:InfiniteData<InfiniteQueryPage<Chat>> | undefined;
  // chatsStatus:'success' | 'error' | 'pending',
  // retrieveOlderMessages:() => void
}

const ConversationContext = createContext<ConversationContextType | null>(null)

export const useConversationContext = () => {
  const context =  useContext(ConversationContext)
  if(!context) throw new Error('cannot use conversation context outside a conversation')
  return context
}

const ConversationContextProvider = ({ children, conversationId }: { children: React.ReactNode; conversationId: string }) => {

  const { data: conversation } = useGetConversation(conversationId)
  const navigation = useNavigation()
 
  useEffect(() => {
    if(conversation){
      navigation.setOptions({
        headerTitle:conversation.other_end.username
      })
    }
  },[conversation])

  return conversation ? ( 
    <ConversationContext.Provider value={{
      conversation,
     }}>
      { children }
    </ConversationContext.Provider>
  ): <AutoCenteredActivityIndicator />
}

export default ConversationContextProvider