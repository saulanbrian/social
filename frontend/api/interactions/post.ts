import { InfiniteData, useMutation, useQueryClient, } from '@tanstack/react-query'
import api from '../index'
import { Post, PostMutationArgs } from '@/types/post'

import { useState } from 'react'
import usePostUpdater from '../updaters/post'
import { infiniteQueryAppendResultAtTop, InfiniteQueryPage } from '@/utils/queries'


export const useLikePost = () => {
  
  const [postInfo,setPostInfo] = useState<PostMutationArgs | null>(null)
  const { likePost, unlikePost } = usePostUpdater()
  
  
  return useMutation({
    mutationFn: async(post: PostMutationArgs) => {
      likePost(post)
      setPostInfo(post)
      const res = await api.post(`posts/${post.id}/like`)       
      return res.data
    },
    onError:(e) => {
      if(postInfo) unlikePost(postInfo)
    },
  })
}


export const useUnlikePost = () => {
  
  const [postInfo,setPostInfo] = useState<PostMutationArgs| null>(null)
  const { likePost, unlikePost } = usePostUpdater()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn:async(post: { id : string, authorId: string}) => {
      unlikePost(post)
      setPostInfo(post)
      const res = await api.post(`posts/${post.id}/unlike`)
      return res.data
    },
    onError:(e) => {
      if(postInfo) likePost(postInfo)
    },
  })
}


export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async(data: FormData) => {
      const res = await api.post('posts/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Post>>>(['posts'], prevData => {
        if(prevData){
          const updatedData = infiniteQueryAppendResultAtTop({ data: prevData, dataToAppend: data })
          return updatedData
        }
      })
    },
    onError: (error) => {
      console.log(error);
      
    }
  })
}