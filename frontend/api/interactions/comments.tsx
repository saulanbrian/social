import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../index'


export const useAddComment = (postId:string,) => {
  
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async(text:string) => {
      const res = await api.post(`posts/${postId}/comment`,{text})
      return res.data
    },
    onSuccess:(comment) => {
      queryClient.setQueryData(['posts',postId,'comments'],(data) => {
        return {
          ...data,
          pages:[...data.pages.map((page,i) => ({
            ...page,
            results:i === 0? [comment,...page.results]: page.results
          }))]
        }
      })
    },
    onError:(e) => {
      console.log(e)
    }
  })
}