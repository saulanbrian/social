import { useState } from 'react'
import { InfiniteData, useMutation, useQueryClient, } from '@tanstack/react-query'
import { 
  infiniteQueryAppendResultAtTop,
  InfiniteQueryPage,
  summarizeQueryPagesResult,
  updateInfiniteQuerySingleResultById
} from '../../utils/queries'

import api from '../index'
import axios from 'axios'
import { Post, PostMutationArgs } from '@/types/post'


const usePostUpdater = () => {
  
  const queryClient = useQueryClient()
  
  const likePost = ({ id, authorId }: PostMutationArgs ) => {
    
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Post>>>(['posts'], (data) => {
      if(data){
        const updatedData = updateInfiniteQuerySingleResultById({
          data:data,
          id:id,
          updateField: { is_liked:true }
        })
        return updatedData
      }
    })
    
    queryClient.setQueryData<Post>(['posts',id],post => {
      if(post){
        return {
          ...post,
          is_liked:true
        }
      }
    })

    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Post>>>(['user',authorId,'posts'], (prevData) => {
      if(prevData){
        const updatedData = updateInfiniteQuerySingleResultById({
          data:prevData,
          id,
          updateField:{ is_liked: true }
        })
        return updatedData
      }
    })
    
  }
  
  const unlikePost = ({ id, authorId }: PostMutationArgs) => {
    
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Post>>>(['posts'], (data) => {
      if(data){
        const updatedData = updateInfiniteQuerySingleResultById({
          data:data,
          id:id,
          updateField: { is_liked:false }
        })
        return updatedData
      }
    })
    
    queryClient.setQueryData<Post>(['posts',id],post => {
      if(post){
        return {
          ...post,
          is_liked:false,
          name:'sdas'
        }
      }
    })
    
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Post>>>(['user', authorId, 'posts'], (prevData) => {
      if(prevData){
        const updatedData = updateInfiniteQuerySingleResultById({
          data: prevData,
          updateField: { is_liked: false },
          id,
        })
        return updatedData
      }
    })
  }
  
  return {
    likePost, 
    unlikePost
  }
}



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