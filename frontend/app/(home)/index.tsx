import { View, Text, Pressable } from 'react-native'
import { useAuthContext } from '../../context/authentication'

const HomePage = () => {
  
  const { logout } = useAuthContext()
  
  return (
    <View>
      <Pressable onPress={logout}>
        <Text>you are at home. press here to logout</Text>
      </Pressable>
    </View>
  )
}

export default HomePage;