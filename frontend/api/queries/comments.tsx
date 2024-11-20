import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../index'


export const useGetComments = (postId:string) => {
  return useQuery({
    queryKey:['posts',postId,'comments'],
    queryFn: async() => {
      const res = await api.get(`posts/${postId}/comments`)
      return res.data
    }
  })
}