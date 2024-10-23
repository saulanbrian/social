import React, { useRef }  from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import AuthForm from '../../components/AuthForm'

export default function SignupPage() {
  
  const usernameRef = useRef<TextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)
  const passwordConfirmRef = useRef<TextInput | null>(null)
  

  return (
    <AuthForm 
      method='signup'
      usernameRef={usernameRef}
      passwordRef={passwordRef}
      passwordConfirmRef={passwordConfirmRef}
      onSubmit={() => console.log('hi')}
      />
  )
}

