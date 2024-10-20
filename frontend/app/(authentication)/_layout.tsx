import { Stack } from 'expo-router'

const AuthenticationLayout = () => {
  
  return (
    <Stack initialRouteName='login'>
      <Stack.Screen name='index' options={{
        title:'login'
      }}/>
      <Stack.Screen name='signup' />
    </Stack>
  )
}

export default AuthenticationLayout;