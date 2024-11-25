import { Stack } from 'expo-router'

import { useThemeContext } from '../../context/theme'

const PostStack = () => {
  
  const { theme } = useThemeContext()
  
  return (
    <Stack screenOptions={{
      headerTintColor:theme.colors.text,
      headerStyle:{
        backgroundColor:theme.colors.background.card
      },
      cardStyle:{
          backgroundColor:'red'
        }
    }}>
      <Stack.Screen name='[id]' options={{
        title:'post'
      }}/>
    </Stack>
  )
}

export default PostStack;