import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../index'
import { Notification } from '../../types/notification'

import useNotificationUpdater from '../updaters/notifications'


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

