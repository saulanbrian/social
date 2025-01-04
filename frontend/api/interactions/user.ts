import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '..'
import User from '@/types/user'
import useUserUpdater from '../updaters/user'
import { useState } from 'react'

export const useUpdateUserMutation = (id:string |  number) => {
  return useMutation({
    mutationFn:async( data: FormData) => {
      const res = await api.patch(`user/${id}/update/`,data,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      return res.data
    }
  })
}


export const useFollowUser = () => {

  const [user,setUser] = useState<string>()
  const { markAsFollowed, unmarkAsFollowed } = useUserUpdater()

  return useMutation<User,Error,string>({
    mutationFn: async(userId:string) => {
      setUser(userId)
      markAsFollowed(userId)
      const res = await api.post(`user/${userId}/follow`)
      return res.data
    },
    onError:() => {
      if(user) unmarkAsFollowed(user)
    }
  })
}


export const useUnfollowUser = () => {

  const [user,setUser] = useState<string>()
  const { markAsFollowed, unmarkAsFollowed } = useUserUpdater()

  return useMutation<User,Error,string>({
    mutationFn: async(userId:string) => {
      setUser(userId)
      unmarkAsFollowed(userId)
      const res = await api.post(`user/${userId}/unfollow`)
      return res.data
    },
    onError:() => {
      if(user) markAsFollowed(user)
    }
  })
}
