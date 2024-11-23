import { Avatar, ThemedText, ThemedView } from '../ui'
import { StyleSheet } from 'react-native'
import CommentType from '../../types/comment'


const API_URL = process.env.EXPO_PUBLIC_API_URL

const Comment = ({
  id,
  text,
  author_profile,
  author_username
}: CommentType) => {
  return (
    <ThemedView style={styles.container}>
    
      <Avatar source={ API_URL + author_profile} size={40}/> 
      
      <ThemedView style={{flex:1}}>
        <ThemedText style={styles.username}>
          { author_username }
        </ThemedText>
        <ThemedText style={{paddingRight:8,flex:1}}>{ text }</ThemedText>
      </ThemedView>
      
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    padding:8,
    gap:8,
    flex:1
  },
  header:{
    flex:1,
    flexDirection:'row',
    padding:4,
    gap:2
  },
  username:{
    marginBottom:2,
    fontSize:16,
    fontWeight:600
  }
  
})

export default Comment