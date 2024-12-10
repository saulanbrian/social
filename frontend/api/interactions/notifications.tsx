import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../index'
import { Notification } from '../../types/notification'
import { 
  infiniteQueryUpdateAllResults,
  infinitQueryUpdateMultipleResults,
  updateInfiniteQuerySingleResultById
} from '../../utils/queries'


const useNotificationUpdater = ()=> {
  
  const queryClient = useQueryClient()
  
  const markNotificationsAsPreviewed = (ids: (string | number)[]) => {
    queryClient.setQueryData(['notifications'], data => {
      const updatedData = infinitQueryUpdateMultipleResults<Notification>({
        data:data,
        updateField:{ previewed:true },
        item_ids:ids
      })
      return updatedData
    })
  }
  
  const markNotificationAsRead = (id: string | number) => {
    queryClient.setQueryData(['notifications'], data => {
      const updatedData = updateInfiniteQuerySingleResultById<Notification>({
        data,
        id,
        updateField: { is_read:true }
      })
      return updatedData
    })
  }
  
  const markNotificationAsUnRead = (id: string | number) => {
    queryClient.setQueryData(['notifications'], data => {
      const updatedData = updateInfiniteQuerySingleResultById<Notification>({
        data,
        id,
        updateField: { is_read:false }
      })
      return updatedData
    })
  }
   
  return { 
    markNotificationsAsPreviewed,
    markNotificationAsRead,
    markNotificationAsUnRead,
  }
  
}


export const useMarkNotificationsAsPreviewed = () => {
  
  const {
    markNotificationsAsPreviewed,
  }  = useNotificationUpdater()
  const [notificationIds,setNotificationIds] = useState<(string | number)[]>([])
  
  
  return useMutation({
    mutationFn:async(ids:(string | number)[]) => {
      setNotificationIds(ids)
      const res = await api.post(
        'notifications/preview',
        { notification_ids: ids}
      )
      return res.data
    },
    onSuccess:() => {
      markNotificationsAsPreviewed(notificationIds)
    },
  })
}


export const useReadNotification = () => {
  
  const {
    markNotificationAsRead,
    markNotificationAsUnRead
  } = useNotificationUpdater()
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
      console.log(e)
      markNotificationAsUnRead(notificationId)
    }
  })
}

