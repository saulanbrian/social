import React, { useRef, useCallBack, useState }  from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import AuthForm, { AuthFormRef } from '../../components/AuthForm'
import { useRouter } from 'expo-router'

import { FormErrorType } from '../../utils/errors'

import api from '../../api'

function SignupPage() {
  
  const router = useRouter()
  const formRef = useRef<AuthFormRef | null>(null)
  const [error,setError] = useState<FormErrorType>({})
  const [isPending,setIsPending] = useState<boolean>(false)
  
  async function handleSubmit() {
    const { username, password, passwordConfirm } = formRef.current
    
    if(password == passwordConfirm){
      try{
        setIsPending(true)
        const res = await api.post('user/register/',{username,password})
        router.replace('/authentication/login')
      }catch(e){
        if(e.response && e.response.data){
          setError(e.response.data)
        }
      }finally{
        setIsPending(false)
      }
    }else{
      setError({detail:'password do not match'})
    }
  }
  
  return (
    <AuthForm 
      method='signup'
      ref={formRef}
      onSubmit={handleSubmit}
      error={error}
      isPending={isPending}
      />
  )
}

export default SignupPage;
