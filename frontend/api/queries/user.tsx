import User from "@/types/user"
import { InfiniteData, useQuery, useSuspenseInfiniteQuery, useSuspenseQuery, } from "@tanstack/react-query"
import api from ".."
import { PostImage } from "@/types/post"
import { InfiniteQueryPage } from "@/utils/queries"


export const useGetUser = (id:string | number) => {
  return useSuspenseQuery<User>({
    queryKey:['user',id],
    queryFn:async() => {
      const res = await api.get(`user/${id}/`)
      return res.data
    },
    staleTime:5 * 60 * 10000
  })
}


export const useGetUserImages = (userId: string) => { 

  return useSuspenseInfiniteQuery<InfiniteQueryPage<PostImage>>({
    queryKey:['user',userId,'photos'],
    queryFn: async({ pageParam }) => {
      const res = await api.get(`user/${userId}/photos?page=${pageParam}`)
      return res.data
    },
    initialPageParam: 1,
    getNextPageParam:(lastPage,pages) => {
      if(lastPage && lastPage.next){
        return pages.length + 1
      }
    },
    staleTime: 5 * 60 & 1000
  })
}