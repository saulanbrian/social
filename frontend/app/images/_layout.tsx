import { useThemeContext } from "@/context/theme"
import { Stack } from "expo-router"

const ImageStack = () => {

  const { theme } = useThemeContext()

  return (
    <Stack screenOptions={{
      headerTintColor:theme.colors.tabBarIcon,
      headerStyle:{
        backgroundColor:theme.colors.background.default
      }
    }}>
      <Stack.Screen name='user/[id]' />
    </Stack>
  )
}

export default ImageStack