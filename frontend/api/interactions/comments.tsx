import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../index'
import { infiniteQueryAppendResultAtTop } from '../../utils/queries'


const useCommentsUpdater = () => {
  
  const queryClient = useQueryClient()
  
  const appendAtTop = (comment,postId) => {
    queryClient.setQueryData(['posts',postId,'comments'],(data) => {
      const updatedData = infiniteQueryAppendResultAtTop({
        data,
        newData:comment
      })
      return updatedData
    })
  }
  
  return {
    appendAtTop
  }
}


export const useAddComment = (postId:string,) => {
  
  const { appendAtTop } = useCommentsUpdater()
  
  return useMutation({
    mutationFn: async(text:string) => {
      const res = await api.post(`posts/${postId}/comment`,{text})
      return res.data
    },
    onSuccess:(comment) => {
      appendAtTop(comment,postId)
    },
    onError:(e) => {
      console.log(e)
    }
  })
}