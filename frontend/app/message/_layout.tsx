import { useThemeContext } from "@/context/theme";
import { Stack } from "expo-router"

const MessageStack = () => {

  const { theme } = useThemeContext()

  return (
    <Stack screenOptions={{
      headerTintColor:theme.colors.text,
      headerStyle:{
        backgroundColor:theme.colors.background.card
      }
    }}>
      <Stack.Screen name="index" options={{ 
        headerTitle:'messages',
        headerShadowVisible:false
      }}/>
      <Stack.Screen name='[conversation_id]' options={{
        headerTitle:''
      }}/>
    </Stack>
  )
}

export default MessageStack;