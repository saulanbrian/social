import React, { useRef, useState}  from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import AuthForm, { AuthFormRef } from '../../components/AuthForm'
import { FormErrorType } from '../../utils/errors'

import api from '../../api'

function LoginPage() {
  
  const { login } = useAuthContext()
  const formRef = useRef<AuthFormRef>(null)
  const [error,setError] = useState<FormErrorType | null>(null)
  const [isPending,setIsPending] = useState<boolean>(false)
  
  async function handleSubmit() {
    const { username, password } = formRef.current as AuthFormRef
    
    try{
      setIsPending(true)
      const res = await api.post('auth/token/',{username,password})
      login({access:res.data.access,refresh:res.data.refresh})
    }catch(e:any){
      console.log({...e})
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
