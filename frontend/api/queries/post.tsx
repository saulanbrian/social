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
    }
  })
}

