import { ThemedView, ThemedText } from '../../components/ui'
import { Notification } from '../../components'
import { FlashList, FlashListProps } from '@shopify/flash-list'

import { useEffect, useCallback, useState } from 'react'
import { useGetInfiniteNotifications } from '../../api/queries/notification'
import { useUpdateContext } from '../../context/update'
import { useFocusEffect } from '@react-navigation/native'
import { summarizeQueryPagesResult } from  '../../utils/queries'
import { useMarkNotificationsAsPreviewed } from '../../api/interactions/notifications'

const Notifications = () => {
  
  const { data: notifications, status } = useGetInfiniteNotifications()
  const { freshNotifications, setFreshNotifications } = useUpdateContext()
  const { mutate:markNotificationsAsPreviewed } = useMarkNotificationsAsPreviewed()
  
  useEffect(() => {
    if(notifications){
      const notificationSum = summarizeQueryPagesResult(notifications)
      setFreshNotifications(notificationSum.filter(notification => !notification.previewed))
    }
  },[notifications])
  
  
  useFocusEffect(useCallback(() => {
    markNotificationsAsPreviewed(freshNotifications.map(
      notification => notification.id
    ))
  },[freshNotifications]))

  return (
    <ThemedView style={{flex:1}}>
      { status === 'success' && (
        <FlashList 
          data={summarizeQueryPagesResult(notifications)}
          keyExtractor={(notification) => notification.id}
          renderItem={({item:notification}) => {
            return <Notification key={notification.id} notification={notification} />
          }}/>
      ) }
    </ThemedView>
  )
}

export default Notifications;