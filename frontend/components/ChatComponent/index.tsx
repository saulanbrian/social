import { Chat } from "@/types/chat"
import { Avatar, ThemedText, ThemedView } from "../ui"
import { StyleSheet, ViewStyle } from "react-native"
import { useThemeContext } from "@/context/theme"

type ChatComponentProps = {
  messageType:'sent' | 'received';
  message: string;
  sender_profile?: string;
  style?:ViewStyle
}

const ChatComponent = ({ message, sender_profile, messageType, style }: ChatComponentProps) => {

  const { theme } = useThemeContext()
  const sent = messageType === 'sent'

  return (
    <ThemedView style={
      [
        {
          flexDirection: sent ? 'row-reverse': 'row',
          alignSelf: sent? 'flex-end': 'flex-start'
        },
        styles.container,
        style
      ]
    }>
      { !sent && <Avatar source={sender_profile || null} size={40}/>}
      <ThemedText style={
        [
          styles.text,
          {
            backgroundColor: sent? theme.colors.tint: theme.colors.background.card,
            color:sent? theme.colors.tabBarIcon: theme.colors.text
          }
        ]
      }>
        { message }
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    gap:4,
    margin:4
  },
  text:{
    fontSize:16,
    borderRadius:20,
    padding:12
  }
})

export default ChatComponent