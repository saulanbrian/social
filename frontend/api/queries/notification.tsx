import { useInfiniteQuery, useQueryClient,  } from '@tanstack/react-query'

import api from '../index'
import { Notification } from '@/types/notification'
import { InfiniteQueryPage } from '@/utils/queries'

export const useGetInfiniteNotifications = () => {
  return useInfiniteQuery<InfiniteQueryPage<Notification>>({
    initialPageParam:1,
    queryKey:['notifications'],
    queryFn:async({ pageParam }) => {
      const res = await api.get(`/notifications/?page=${pageParam}`)
      return res.data
    },
    getNextPageParam:(lastPage,pages) => {      
      if(lastPage && lastPage.next){
        return pages.length + 1
      }
      return undefined
    },
    staleTime:60000
  })
}