import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '..'
import User from '@/types/user'

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

  const queryClient = useQueryClient()

  return useMutation<User,Error,string>({
    mutationFn: async(userId:string) => {
      const res = await api.post(`user/${userId}/follow`)
      return res.data
    },
    onSuccess:(user) => {
      queryClient.invalidateQueries({
        queryKey:['user',user.id],
        exact:true
      })
    }
  })
}


export const useUnfollowUser = () => {

  const queryClient = useQueryClient()

  return useMutation<User,Error,string>({
    mutationFn: async(userId:string) => {
      const res = await api.post(`user/${userId}/unfollow`)
      return res.data
    },
    onSuccess:(user) => {
      queryClient.invalidateQueries({
        queryKey:['user',user.id],
        exact:true
      })
    }
  })
}
