import User from "@/types/user"
import { InfiniteQueryPage } from "@/utils/queries"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import api from ".."
import { Post } from "@/types/post"

export const useSearchUser = (searchKey:string | undefined) => {
  return useInfiniteQuery<InfiniteQueryPage<User>>({
    queryKey:['search','users',searchKey],
    queryFn:async({ pageParam }) => {
      const res = await api.get(`user/search?page=${pageParam}`,{ params: { q: searchKey } })
      return res.data
    },
    initialPageParam:1,
    getNextPageParam:(lastPage,pages) => {
      if(lastPage.next){
        return pages.length + 1
      }
    },
    staleTime:60 * 1000,
    enabled:!!searchKey
  })
}

export const useSearchPosts = (searchKey:string | undefined) => {
  return useInfiniteQuery<InfiniteQueryPage<Post>>({
    queryKey:['search','posts',searchKey],
    queryFn:async({ pageParam }) => {
      const res = await api.get(`posts/search?page=${pageParam}`, { params: { q: searchKey }})
      return res.data
    },
    getNextPageParam:(lastPage,pages) => {
      if(lastPage.next){
        return pages.length + 1
      }
    },
    initialPageParam:1,
    staleTime:60 * 1000,
    enabled:!!searchKey
  })
}