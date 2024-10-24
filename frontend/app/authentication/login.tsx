import React, { useRef, useCallBack, useState}  from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import AuthForm, { AuthFormRef } from '../../components/AuthForm'
import { FormInputErrorType } from '../../utils/errors'

import api from '../../api'

function LoginPage() {
  
  const { login } = useAuthContext()
  const formRef = useRef<AuthFormRef | null>(null)
  const [errors,setErrors] = useState<FormInputErrorType[]>([])
  
  async function handleSubmit() {
    const { username, password } = formRef.current
    if(username && password){
      setErrors([])
      try{
        const res = await api.post('auth/token/',{username,password})
        login()
      }  catch(e){
        if(e.response && e.response.data){
          const data = Array.isArray(e.response.data) ? e.response.data : [e.response.data,]
          data.map(error => {
            Object.entries(error).map(([field,message]) => {
              setErrors(errors => [...errors, { field, message }])
            })
          })
        }
      }
    }
  }
  
  return (
    <AuthForm 
      method='login'
      ref={formRef}
      onSubmit={handleSubmit}
      errors={errors}
      />
  )
}

export default LoginPage;
