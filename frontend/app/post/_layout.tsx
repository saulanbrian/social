import { useThemeContext } from "@/context/theme"
import { Stack } from "expo-router"
import { Dimensions } from "react-native"

const PostStack = () => {

  const { theme } = useThemeContext()

  return (
    <Stack screenOptions={{
      headerStyle:{
        backgroundColor:theme.colors.background.card
      },
      headerTintColor:theme.colors.text,
      headerShadowVisible:false,
    }}>
      <Stack.Screen name="[id]" options={{
        headerTitle:'post'
      }}/>
      <Stack.Screen name="create" options={{
        headerTitle:'create new post',
      }}/>
    </Stack>
  )
}
 
export default PostStack 