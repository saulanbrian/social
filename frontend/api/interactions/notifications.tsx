import { useMutation, useQueryClient } from '@tanstack/react-query'

import api from '../index'
import { Notification } from '../../types/notification'
import { infiniteQueryUpdateAllResults } from '../../utils/queries'

export const useMarkNotificationsAsPreviewed = () => {
  
  const queryClient = useQueryClient()
  
  const markAllNotificationsAsPreviewed = () => {
    queryClient.setQueryData(['notifications'], data => {
      const updatedData = infiniteQueryUpdateAllResults<Notification>({
        data:data,
        updateField:{
          previewed:true
        }
      })
      return updatedData
    })
  }
  
  return useMutation({
    mutationFn:async(ids:number[]) => {
      const res = await api.post('notifications/preview',{ notification_ids: ids})
      return res.data
    },
    onSuccess:() => {
      markAllNotificationsAsPreviewed()
    }
  })
}


