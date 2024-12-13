import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../index'
import { infiniteQueryAppendResultAtTop, InfiniteQueryPage } from '../../utils/queries'
import Comment from '@/types/comment'


const useCommentsUpdater = () => {
  
  const queryClient = useQueryClient()
  
  const appendCommentAtTop = (comment:Comment,postId:string) => {
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Comment>>>(['posts',postId,'comments'],data => {
      if(data){
        const updatedData = infiniteQueryAppendResultAtTop({
          data,
          dataToAppend:comment
        })
        return updatedData
      }
    })
  }
  
  return {
    appendCommentAtTop
  }
}


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