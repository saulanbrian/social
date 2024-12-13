import { useQuery, useSuspenseInfiniteQuery, useMutation, useSuspenseQuery, InfiniteData, useQueryClient } from '@tanstack/react-query'
import { Post } from '@/types/post'

import api from '../index'
import { InfiniteQueryPage } from '@/utils/queries'


export const useGetPosts = () => {
  return useSuspenseInfiniteQuery<InfiniteQueryPage<Post>>({
    queryKey:['posts'],
    queryFn:async({ pageParam }) => {
      const res = await api.get(`posts/?page=${pageParam}`)
      return res.data
    },
    initialPageParam:1,
    getNextPageParam:(lastPage,pages) => { 
      if(lastPage && lastPage.next){
        return pages.length + 1
      }
      return undefined
    },
    staleTime: 5 * 60 * 1000,
  })
}


export const useGetPost = (id:string) => {
  return useSuspenseQuery<Post>({
    queryKey:['posts',id],
    queryFn: async() => {
      const res = await api.get(`posts/${id}`)
      return res.data
    }
  })
}
