import { StyleSheet } from "react-native"
import { ThemedText, ThemedView } from "../ui"
import { useThemeContext } from "@/context/theme"

const PendingMessage = ({ text }: { text: string }) => {

  const { theme } = useThemeContext()

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={
        [
          styles.text,
          {
            backgroundColor:theme.colors.tint,
            color:theme.colors.tabBarIcon
          }
        ]
      }>{text}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    gap:4,
    margin:4,
    flexDirection:'row-reverse',
    opacity:0.7
  },
  text:{
    fontSize:16,
    borderRadius:20,
    padding:12
  }
})

export default PendingMessage