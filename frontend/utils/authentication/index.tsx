import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL

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
    const res = await axios.post(`${API_URL}auth/token/refresh/`,{refresh:token})
    console.log(res.data)
    return res.data.refresh
  }catch(e){
    console.log(e)
    return undefined
  }
}
