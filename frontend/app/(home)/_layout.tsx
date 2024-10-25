import { Stack } from 'expo-router' 


const HomeLayout = () => {
  
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerTitle:'home',
        headerTitleAlign:'center',
      }} />
    </Stack>
  )
}

export default HomeLayout;