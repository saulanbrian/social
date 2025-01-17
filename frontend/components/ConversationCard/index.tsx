import { Conversation } from "@/types/conversation"
import { Avatar, ThemedText, ThemedView } from "../ui"
import { Alert, Pressable, StyleSheet, ViewProps } from "react-native"
import { useGetCurrentUser } from "@/api/queries/user"
import { useEffect } from "react"
import { useRouter } from "expo-router"

const API_URL = process.env.EXPO_PUBLIC_API_URL

type ConversationCardProps = ViewProps & {
  conversation: Conversation
}

const ConversationCard = ({ conversation, style,...props } : ConversationCardProps ) => {

  const router = useRouter()
  const { data: currentUser } = useGetCurrentUser()
  const otherEndProfile = conversation.other_end.profile_picture
    ? API_URL + conversation.other_end.profile_picture
    : null

  const handlePress = () => {
    router.push({
      pathname:'/message/[conversation_id]',
      params: { conversation_id: conversation.id }
    })
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Avatar source={ otherEndProfile } size={44}/>
      <ThemedView style={styles.subContainer}>
        <ThemedText style={styles.username}>{ conversation.other_end.username } </ThemedText>
        <ThemedText>{ conversation.last_message?.message as string }</ThemedText>
      </ThemedView>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  container:{
    padding:8,
    gap:4,
    flexDirection:'row',
  },
  subContainer:{
    paddingVertical:4
  },
  username:{
    fontSize:16,
    fontWeight:600,
  }
})


export default ConversationCard