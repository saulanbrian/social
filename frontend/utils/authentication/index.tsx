import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import { API_URL } from '../../constants/api'

export const getRefreshToken = async() => {
  const token = await SecureStore.getItemAsync('refresh')
  return token
}

export const getAccessToken = async() => {
  const token = await SecureStore.getItemAsync('access')
  return token
}

export const refreshToken = async(token:string) => {
  
  try{ 
    const res = await axios.post(`${API_URL}/auth/token/refresh/`,{refresh:token})
    await SecureStore.setItemAsync('access',res.data.access)
    await SecureStore.setItemAsync('refresh',res.data.refresh)
    return res.data
  }catch(e){
    console.log(e)
    return undefined
  }
}
