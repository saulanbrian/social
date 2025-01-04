import { Post, PostMutationArgs } from "@/types/post"
import { InfiniteQueryPage, updateInfiniteQuerySingleResultById } from "@/utils/queries"
import { InfiniteData, useQueryClient } from "@tanstack/react-query"

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

export default usePostUpdater