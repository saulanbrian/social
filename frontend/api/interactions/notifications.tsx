import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../index'
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


export const useMarkNotificationsAsPreviewed = () => {
  
  const { markNotificationsAsPreviewed }  = useNotificationUpdater()

  const [notificationIds,setNotificationIds] = useState<(string | number)[]>([])
  
  
  return useMutation({
    mutationFn:async(ids:(string | number)[]) => {
      setNotificationIds(ids)
      const res = await api.post('notifications/preview', { notification_ids: ids} )
      return res.data
    },
    onSuccess:() => {
      markNotificationsAsPreviewed(notificationIds)
    },
  })
}


export const useReadNotification = () => {
  
  const { markNotificationAsRead, markNotificationAsUnRead } = useNotificationUpdater()
  const [notificationId,setNotificationId] = useState<string | number | null>(null)
  
  return useMutation({
    mutationFn:async(id:string | number) => {

      setNotificationId(id)

      markNotificationAsRead(id)

      const res = await api.post(
        'notifications/mark_as_read',
        { notification_id: id }
      )
      return res.data

    },
    onError:(e) => {
      if(notificationId) markNotificationAsUnRead(notificationId)
    }
  })
}

