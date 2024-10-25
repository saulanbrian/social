import { View, Text, Pressable } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomePage = () => {
  
  const { logout } = useAuthContext()
  
  return (
    <Pressable onPress={logout}>
      <Text>you are at home. press here to logout</Text>
    </Pressable>
  )
}

export default HomePage;