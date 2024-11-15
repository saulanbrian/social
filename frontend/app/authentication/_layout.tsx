import { Stack } from 'expo-router'

const AuthenticationLayout = () => {
  
  return (
    <Stack initialRouteName='login' screenOptions={{
      headerShown:true,
    }}>
      <Stack.Screen name='login' />
      <Stack.Screen name='signup' />
    </Stack>
  )
}

export default AuthenticationLayout;