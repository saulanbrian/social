import { ThemedView, ThemedText, ThemedActivityIndicator } from '../../components/ui'
import { Notification } from '../../components'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import { StyleSheet } from 'react-native'

import { useEffect, useCallback, useState, Suspense } from 'react'
import { useGetInfiniteNotifications } from '../../api/queries/notification'
import { useUpdateContext } from '../../context/update'
import { useFocusEffect } from '@react-navigation/native'
import { summarizeQueryPagesResult } from  '../../utils/queries'
import { useMarkNotificationsAsPreviewed } from '../../api/interactions/notifications'
import { Notification as NotificationType } from '@/types/notification'


const NotificationPage = () =>{

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <NotificationList />
    </Suspense>
  )
}

const NotificationList = () => {
  
  const { data: notifications, status, fetchNextPage, isFetchingNextPage } = useGetInfiniteNotifications()
  const { freshNotifications, setFreshNotifications } = useUpdateContext()
  const { mutate:markNotificationsAsPreviewed } = useMarkNotificationsAsPreviewed()
  
  
  useEffect(() => {
    if(notifications){
      const notificationSum = summarizeQueryPagesResult(notifications)
      setFreshNotifications(notificationSum.filter(notification => !notification.previewed))
    }
  },[notifications])
  
  
  useFocusEffect(useCallback(() => {
    if(freshNotifications.length >= 1){
      markNotificationsAsPreviewed(freshNotifications.map(
        notification => notification.id
      ))
    }
  },[freshNotifications]))


  return (
    <FlashList
      data={summarizeQueryPagesResult(notifications)}
      keyExtractor={notification => notification.id.toString()}
      renderItem={({item: notification}) => <Notification key={notification.id} notification={notification}/>}
      onEndReached={fetchNextPage}   
      ListFooterComponent={ isFetchingNextPage ? <ThemedActivityIndicator /> : <ThemedText>no more notifications available</ThemedText>}
    />
  )
}


const styles = StyleSheet.create({
  emptyMessage:{
    flex:1,
    alignSelf:'center'
  },
  footer:{
    flex:1,
    alignSelf:'center',
    marginTop:16
  },
})

export default NotificationPage;