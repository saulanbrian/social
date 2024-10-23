import React, { useRef }  from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import AuthForm from '../../components/AuthForm'

const LoginPage = () => {
  
  const { login } = useAuthContext()
  const usernameRef = useRef<TextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)
  
  return (
    <AuthForm 
      method='login'
      usernameRef={usernameRef}
      passwordRef={passwordRef}
      onSubmit={() => console.log('hi')}
      />
  )
}

export default LoginPage;
