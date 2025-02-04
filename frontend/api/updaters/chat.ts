import { Chat } from "@/types/chat"
import { Conversation } from "@/types/conversation"
import { infiniteQueryAppendResultAtTop, InfiniteQueryPage, summarizeQueryPagesResult, updateInfiniteQuerySingleResultById } from "@/utils/queries"
import { InfiniteData, useQueryClient } from "@tanstack/react-query"

const useConversationChatUpdater = (convoId:string) => {

  const queryClient = useQueryClient()
  
  const pushChatToTop = (chat:Chat) => {
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Chat>>>(['conversation',convoId,'messages'], data => {
      if(data && !summarizeQueryPagesResult(data).some(savedChat => savedChat.id === chat.id)){
        const updatedData = infiniteQueryAppendResultAtTop({ data, dataToAppend: chat })
        return updatedData
      }
    })
  }

  const updateConversationLastMessage = () => {
    const conversationChats = queryClient.getQueryData<InfiniteData<InfiniteQueryPage<Chat>>>(['conversation',convoId,'messages'])

    if(conversationChats){

      const conversationChatSum = summarizeQueryPagesResult(conversationChats)

      queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Conversation>>>(['conversations'], data => {
        if(data){
          const updatedData = updateInfiniteQuerySingleResultById({
            data,
            id:convoId,
            updateField:{
              last_message: conversationChatSum[0]
            }
          })
          return updatedData
        }
      })
    }
  }

  return { pushChatToTop, updateConversationLastMessage }
}

export default useConversationChatUpdater