import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { Notification } from '../../types/notification'
import { 
  infiniteQueryAppendResultAtTop,
  InfiniteQueryPage,
  infiniteQueryUpdateAllResults,
  infinitQueryUpdateMultipleResults,
  updateInfiniteQuerySingleResultById
} from '../../utils/queries'


export const useNotificationUpdater = ()=> {
  
  const queryClient = useQueryClient()
  
  const markNotificationsAsPreviewed = (ids: (string | number)[]) => {
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Notification>>>(['notifications'], data => {
      if(data){
        const updatedData = infinitQueryUpdateMultipleResults<Notification>({
          data,
          updateField:{ previewed:true },
          item_ids:ids
        })
        return updatedData
      }
    })
  }
  
  const markNotificationAsRead = (id: string | number) => {
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Notification>>>(['notifications'], data => {
      if(data){
        console.log(id)
        const updatedData = updateInfiniteQuerySingleResultById<Notification>({
          data,
          id,
          updateField: { is_read:true }
        })
        return updatedData
      }
    })
  }
  
  const markNotificationAsUnRead = (id: string | number) => {
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Notification>>>(['notifications'], data => {
      if(data){
        const updatedData = updateInfiniteQuerySingleResultById<Notification>({
          data,
          id,
          updateField: { is_read:false }
        })
        return updatedData
      }
    })
  }

  const appendNotificationAtTop = (notification: Notification) => {
    queryClient.setQueryData<InfiniteData<InfiniteQueryPage<Notification>>>(['notifications'],data => {
      
      if(data){
        const updatedData = infiniteQueryAppendResultAtTop({
          data,
          dataToAppend:notification
        })
        return updatedData
      }
      return data
    })
  }
   
  return { 
    markNotificationsAsPreviewed,
    markNotificationAsRead,
    markNotificationAsUnRead,
    appendNotificationAtTop
  }
  
}

export default useNotificationUpdater