import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/react-query'

import api from '../index'


export const useGetPosts = () => {
  return useInfiniteQuery({
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
  return useQuery({
    queryKey:['posts',id],
    queryFn: async() => {
      const res = await api.get(`posts/${id}`)
      return res.data
    },
    suspense:true
  })
}
