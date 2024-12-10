import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import api from '../index'


export const useGetInfiniteComments = (postId:string) => {
  
  return useInfiniteQuery({
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
  return useQuery({
    queryKey:['comments',id],
    queryFn:async() => {
      const res = await api.get(`comments/${id}`)
      return res.data
    },
    suspense:true,
    useErrorBoundary:true
  })
}