import { ThemedView, ThemedText } from '../../components/ui'
import { Notification } from '../../components'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import { StyleSheet } from 'react-native'

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
    if(freshNotifications.length >= 1){
      markNotificationsAsPreviewed(freshNotifications.map(
        notification => notification.id
      ))
    }
  },[freshNotifications]))
  
  const generateLink = (notification) => {
    let url: string;
    switch(notification.target_type){
      case 'post' || 'comment':
        return `/post/${notification.target_id}`
    }
  }

  return (
    <ThemedView style={{flex:1}}>
      { status === 'success' && (
        <FlashList 
          data={summarizeQueryPagesResult(notifications)}
          keyExtractor={(notification) => notification.id}
          renderItem={({item:notification}) => (
            <Notification 
              key={notification.id} 
              notification={notification}
              target_link={generateLink(notification)}/>
          )}
          ListFooterComponent={() => (
            <ThemedText style={styles.footer}>
              you're all caught up
            </ThemedText>
          )}
          ListEmptyComponent={() => (
            <ThemedText style={styles.emptyMessage}>
              no notifications yet
            </ThemedText>
            )
          }/>
      ) }
    </ThemedView>
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

export default Notifications;