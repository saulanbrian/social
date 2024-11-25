import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  summarizeQueryPagesResult,
  updateInfiniteQuerySingleResultById
} from '../../utils/queries'

import api from '../index'


export const useLikePost = () => {
  
  const [postId,setPostId] = useState<string | null>(null)
  const queryClient = useQueryClient()
  
  const likePost = (id:string) => {
    
    queryClient.setQueryData(['posts'], (data) => {
      const updatedData = updateInfiniteQuerySingleResultById({
        data:data,
        id:id,
        updateField: { is_liked:true }
      })
      return updatedData
    })
    
    queryClient.setQueryData(['posts',id],post =>{
      return {
        ...post,
        is_liked:true
      }
    })
    
  }
  
  const unlikePost = (id:string) => {
    
    queryClient.setQueryData(['posts'], (data) => {
      const updatedData = updateInfiniteQuerySingleResultById({
        data:data,
        id:id,
        updateField: { is_liked:false }
      })
      return updatedData
    })
    
    queryClient.setQueryData(['posts',id],post =>{
      return {
        ...post,
        is_liked:false
      }
    })
    
  }
  
  return useMutation({
    mutationFn: async(id:string) => {
      likePost(id)
      setPostId(id)
      const res = await api.post(`posts/${id}/like`)
      return res.data
    },
    onError:(e) => {
      console.log(e)
      unlikePost(postId)
    }
  })
}


export const useUnlikePost = () => {
  
  const [postId,setPostId] = useState<string | null>(null)
  const queryClient  = useQueryClient()
  
  const likePost = (id:string) => {
    
    queryClient.setQueryData(['posts'], (data) => {
      const updatedData = updateInfiniteQuerySingleResultById({
        data:data,
        id:id,
        updateField: { is_liked:true }
      })
      return updatedData
    })
    
    queryClient.setQueryData(['posts',id],post =>{
      return {
        ...post,
        is_liked:true
      }
    })
    
  }
  
  const unlikePost = (id:string) => {
    
    queryClient.setQueryData(['posts'], (data) => {
      const updatedData = updateInfiniteQuerySingleResultById({
        data:data,
        id:id,
        updateField: { is_liked:false }
      })
      return updatedData
    })
    
    queryClient.setQueryData(['posts',id],post =>{
      return {
        ...post,
        is_liked:false
      }
    })
    
  }
  
  return useMutation({
    mutationFn:async(id:string) => {
      unlikePost(id)
      setPostId(id)
      const res = await api.post(`posts/${id}/unlike`)
      return res.data
    },
    onError:(e) => {
      likePost(postId)
    }
  })
}