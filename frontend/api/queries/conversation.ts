import { Conversation } from "@/types/conversation"
import { InfiniteQueryPage } from "@/utils/queries"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import api from ".."

export const useGetConversations = () => {
  return useInfiniteQuery<InfiniteQueryPage<Conversation>>({
    queryKey:['conversations'],
    queryFn:async({ pageParam }) => {
      const res = await api.get(`chat/conversations?page=${pageParam}`)
      return res.data
    },
    initialPageParam:1,
    getNextPageParam:(lastPage,pages) => {
      if(lastPage.next){
        return pages.length + 1
      }
    }
  })
}


export const useGetConversation = (id:string) => {
  return useQuery<Conversation>({
    queryKey:['conversation',id],
    queryFn:async() => {
      const res = await api.get(`chat/conversations/${id}`)
      return res.data
    },
    staleTime:5 * 60 * 1000
  })
}