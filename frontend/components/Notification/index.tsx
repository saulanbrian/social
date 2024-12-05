import { ThemedView, ThemedText, Avatar, Card } from '../../components/ui'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { useThemeContext } from '../../context/theme'

import { Notification as NotificationType } from '../../types/notification'


const API_URL = process.env.VITE_API_URL

type Props = {
  notification:NotificationType,
  
}

const Notification = ({
  notification,
  
}:Props) => {
  
  const { theme } = useThemeContext()
  const message = notification.message.split(' ').filter((word, i) => i !== 0 ).join(' ').trim()
  
  return (
    <TouchableOpacity>
      <Card style={
        [
          styles.container,
          notification.is_read && ({
            backgroundColor:theme.colors.background.default
          }) 
        ]
      }>
        <Avatar source={API_URL + notification.actor_profile} size={50}/>
        
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