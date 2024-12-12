import { useSuspenseQuery, useSuspenseInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import api from '../index'
import { InfiniteQueryPage } from '@/utils/queries'
import Comment from '@/types/comment'


export const useGetInfiniteComments = (postId:string) => {
  
  return useSuspenseInfiniteQuery<InfiniteQueryPage<Comment>>({
    queryKey:['posts',postId,'comments'],
    queryFn: async({ pageParam }) => {
      const res = await api.get(`comments/`,{
        params:{
          post:postId,
          page:pageParam
        }
      })
      return res.data
    },
    initialPageParam:1,
    getNextPageParam:(lastPage, pages) => {
      if(lastPage && lastPage.next){
        return pages.length + 1
      }
      return undefined
    }
  })
}


export const useGetComment = (id:string) => {
  return useSuspenseQuery<Comment>({
    queryKey:['comments',id],
    queryFn:async() => {
      const res = await api.get(`comments/${id}`)
      return res.data
    },
  })
}