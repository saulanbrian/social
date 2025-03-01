import { Conversation } from "@/types/conversation"
import { InfiniteQueryPage } from "@/utils/queries"
import { useInfiniteQuery, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import api from ".."
import { useState } from "react"
import axios, { AxiosError } from "axios"

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
    },
    staleTime:5 * 60 * 1000
  })
}


export const useGetConversation = (id:string) => {
  return useSuspenseQuery<Conversation>({
    queryKey:['conversation',id],
    queryFn:async() => {
      const res = await api.get(`chat/conversations/${id}`)
      return res.data
    },
    staleTime:5 * 60 * 1000
  })
}


export const useGetOrCreateConversationWithUser = (userId: string | undefined ) => {
  return useQuery<Conversation>({
    queryKey:['conveersations',userId],
    queryFn:async() => {
      const res = await api.get(`chat/conversations/get_or_create?userId=${userId}`)
      return res.data
    },
    enabled:!!userId
  })
}