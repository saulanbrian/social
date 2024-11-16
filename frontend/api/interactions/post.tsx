import { useMutation, useQueryClient } from '@tanstack/react-query'
import { summarizeQueryPagesResult } from '../../utils/queries'
import api from '../index'


export const useLikePost = () => {
  
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async(id:string) => {
      const res = await api.post(`posts/${id}/like`)
      return res.data
    },
    onSuccess:(likedPost) => { 
      queryClient.setQueryData(['posts'], (data) => {
        return {
          ...data,
          pages:[...data.pages.map((page) => ({
            ...page,
            results:[...page.results.map(post => ({
              ...post,
              is_liked:post.id === likedPost.id? true: post.is_liked
            }))]
          }))]
        }
      })
      queryClient.setQueryData(['posts',likedPost.id],post =>{
        return {
          ...post,
          is_liked:true
        }
      })
    }
  })
}


export const useUnlikePost = () => {
  
  const queryClient  = useQueryClient()
  
  return useMutation({
    mutationFn:async(id:string) => {
      const res = await api.post(`posts/${id}/unlike`)
      return res.data
    },
    onSuccess:(unlikedPost) => {
      queryClient.setQueryData(['posts'], (data) => ({
        ...data,
        pages:[...data.pages.map(page => ({
          ...page,
          results:[...page.results.map(post => ({
            ...post,
            is_liked: post.id === unlikedPost.id? false: post.is_liked
          }))]
        }))]
      }))
      queryClient.setQueryData(['posts',unlikedPost.id],post =>{
        return {
          ...post,
          is_liked:false
        }
      })
    }
  })
}