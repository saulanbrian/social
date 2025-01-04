import { useQueryClient,InfiniteData } from "@tanstack/react-query"
import { InfiniteQueryPage, infiniteQueryAppendResultAtTop } from "@/utils/queries"


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


export default useCommentsUpdater;