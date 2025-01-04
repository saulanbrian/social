import { InfiniteData, useMutation } from '@tanstack/react-query'
import api from '../index'
import Comment from '@/types/comment'

import useCommentsUpdater from '../updaters/comments'


export const useAddComment = (postId:string,) => {
  
  const { appendCommentAtTop } = useCommentsUpdater()
  
  return useMutation({
    mutationFn: async(text:string) => {
      const res = await api.post(`posts/${postId}/comment`,{text})
      return res.data
    },
    onSuccess:(comment) => {
      appendCommentAtTop(comment,postId)
    },
    onError:(e) => {
      console.log(e)
    }
  })
}