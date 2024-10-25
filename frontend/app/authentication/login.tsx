import React, { useRef, useCallBack, useState}  from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import AuthForm, { AuthFormRef } from '../../components/AuthForm'
import { FormErrorType } from '../../utils/errors'

import api from '../../api'

function LoginPage() {
  
  const { login } = useAuthContext()
  const formRef = useRef<AuthFormRef | null>(null)
  const [error,setError] = useState<FormErrorType>({})
  const [isPending,setIsPending] = useState<boolean>(false)
  
  async function handleSubmit() {
    const { username, password } = formRef.current
    try{
      setIsPending(true)
      const res = await api.post('auth/token/',{username,password})
      login({access:res.data.access,refresh:res.data.refresh})
    }catch(e){
      console.log(e)
      if(e.response && e.response.data){
        setError(e.response.data)
      }
    }finally{
      setIsPending(false)
    }
  }
  
  return (
    <AuthForm 
      method='login'
      ref={formRef}
      onSubmit={handleSubmit}
      error={error} 
      isPending={isPending}
      />
  )
}

export default LoginPage;
