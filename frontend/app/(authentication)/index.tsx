import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useAuthContext } from '../../context/authentication'

const LoginPage = () => {
  
  const { login } = useAuthContext()
  
  return (
    <View>
      <Pressable onPress={login}>
        <Text>login</Text>
      </Pressable>
    </View>
  )
}

export default LoginPage;