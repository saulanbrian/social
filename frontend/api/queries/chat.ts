import { Chat } from "@/types/chat"
import { InfiniteQueryPage } from "@/utils/queries"
import { useInfiniteQuery } from "@tanstack/react-query"
import api from ".."

export const useGetChats = (convoId:string) => {
  return useInfiniteQuery<InfiniteQueryPage<Chat>>({
    queryKey:['conversation',convoId,'messages'],
    queryFn: async({ pageParam }) => {
      const res = await api.get(`chat/conversation/${convoId}/messages?page=${pageParam}`)
      return res.data
    },
    initialPageParam:1,
    getNextPageParam:(lastPage,pages) => {
      if(lastPage.next){
        return pages.length + 1
      }
    },
  })
}