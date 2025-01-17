import User from "@/types/user"
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useSuspenseInfiniteQuery, useSuspenseQuery, } from "@tanstack/react-query"
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

export const useGetCurrentUser = ({ enabled } : { enabled?: boolean } = { enabled: true }) => {
  
  return useQuery<User>({
    queryKey:['current_user'],
    queryFn:async() => {
      const res = await api.get('user/current')
      return res.data
    },
    staleTime:Infinity,
    enabled,
  })
}

export const useGetFollowedUser = () => {
  return useInfiniteQuery<InfiniteQueryPage<User>>({
    queryKey:['user','following'],
    queryFn: async({ pageParam }) => {
      const res = await api.get(`user/following?page=${pageParam}`)
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