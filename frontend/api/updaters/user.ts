import User from "@/types/user"
import { useQueryClient } from "@tanstack/react-query"

const useUserUpdater = () => {
  const queryClient = useQueryClient()

  const markAsFollowed = (id:string) => {
    queryClient.setQueryData<User>(['user',id], prevData => {
      if(prevData){
        const updatedData: User = {
          ...prevData,
          is_followed:true,
          followers:prevData.followers + 1
        }
        return updatedData
      }
    })
  }

  
  const unmarkAsFollowed = (id:string) =>  {
    queryClient.setQueryData<User>(['user',id], prevData => {
      if(prevData){
        const updatedData: User = {
          ...prevData,
          is_followed:false,
          followers:prevData.followers - 1
        }
        return updatedData
      }
    })
  }

  return {
    markAsFollowed,
    unmarkAsFollowed
  }
}

export default useUserUpdater