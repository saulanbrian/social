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
import { Post } from '@/types/post'


const usePostUpdater = () => {
  
  const queryClient = useQueryClient()
  
  const likePost = (id:string) => {
    
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
    
  }
  
  const unlikePost = (id:string) => {
    
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
    
  }
  
  return {
    likePost, 
    unlikePost
  }
}



export const useLikePost = () => {
  
  const [postId,setPostId] = useState<string | null>(null)
  const { likePost, unlikePost } = usePostUpdater()
  
  
  return useMutation({
    mutationFn: async(id:string) => {

      likePost(id)

      setPostId(id)

      const res = await api.post(`posts/${id}/like`)
      return res.data
    },
    onError:(e) => {
      if(postId) unlikePost(postId)
    }
  })
}


export const useUnlikePost = () => {
  
  const [postId,setPostId] = useState<string | null>(null)
  const { likePost, unlikePost } = usePostUpdater()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn:async(id:string) => {
      unlikePost(id)
      setPostId(id)
      const res = await api.post(`posts/${id}/unlike`)
      return res.data
    },
    onError:(e) => {
      if(postId) likePost(postId)
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