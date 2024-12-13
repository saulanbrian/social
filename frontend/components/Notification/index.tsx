import { ThemedView, ThemedText, Avatar, Card } from '../../components/ui'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { useCallback } from 'react'
import { Href, useRouter } from 'expo-router'
import { useThemeContext } from '../../context/theme'
import { useReadNotification} from '../../api/interactions/notifications'
import { Notification as NotificationType } from '../../types/notification'


const API_URL = process.env.EXPO_PUBLIC_API_URL

type Props = {
  notification:NotificationType,
}

const Notification = ({
  notification
}:Props) => {

  
  const { theme } = useThemeContext()
  const message = notification.message.split(' ').filter((word, i) => i !== 0 ).join(' ').trim()
  const { mutate: markAsRead } = useReadNotification()
  const router = useRouter()
  
  
  const handlePress = () => {
    const url = generateUrl()
    if(url) router.navigate(url as Href<string>)
    markAsRead(notification.id)
  }
  
  const generateUrl = () => {
    switch(notification.target_type){
      case 'post':
        return `/post/${notification.target_id}`
      case 'comment':
        return `/comment/${notification.target_id}`
    }
    return null
  }
  
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Card
        style={
          [
            styles.container,
            notification.is_read && ({
              backgroundColor:theme.colors.background.default
            }) 
          ]
        }
      >
        <Avatar 
          source={API_URL + notification.actor_profile} 
          size={50}/>
        
          <ThemedText style={styles.username}>
            { notification.actor_username }
          </ThemedText>
          
          <ThemedText style={{flex:1}}>
            {message}
          </ThemedText>
      </Card>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    gap:8,
    alignItems:'center',
  },
  username:{
    fontWeight:600,
    fontSize:16
  }
})


export default Notification;