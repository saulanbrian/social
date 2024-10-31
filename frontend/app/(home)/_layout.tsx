import { useThemeContext } from '@/context/theme'
import { Stack } from 'expo-router' 


const HomeLayout = () => {

  const { theme } = useThemeContext()
  
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerTitle:'home',
        headerTitleStyle:{
          color:theme.colors.text
        },
        headerStyle:{
          backgroundColor: theme.colors.secondary
        }
      }} />
    </Stack>
  )
}

export default HomeLayout;