import React, { useRef, useCallBack}  from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import AuthForm, { AuthFormRef } from '../../components/AuthForm'

import api from '../../api'

function SignupPage() {
  
  const { login } = useAuthContext()
  const formRef = useRef<AuthFormRef | null>(null)
  
  async function handleSubmit() {
    const { username, password } = formRef.current
    if(username && password){
      try{
        const res = await api.post('auth/token/',{username,password})
        console.log(res.data)
  
      }  catch(e){
        console.log(e)
      }
    }
  }
  
  return (
    <AuthForm 
      method='signup'
      ref={formRef}
      onSubmit={handleSubmit}
      />
  )
}

export default SignupPage;
