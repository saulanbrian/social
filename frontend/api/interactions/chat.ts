import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from ".."

export const useSendMessage = ({ conversationId } :{ conversationId : string}) => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn:async(message:string) => {
      const res = await api.post(`chat/conversation/${conversationId}/messages`,{ 
        message,
      })
      return res.data
    },
    onSuccess:(e) => {
      queryClient.invalidateQueries({ queryKey: ['conversation',conversationId,'messages']})
    }
  })
}