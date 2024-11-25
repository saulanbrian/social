import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { JwtPayload } from 'jwt-decode'

import { API_URL } from '../../constants/api'
import { jwtDecode } from 'jwt-decode'

export interface CustomJwtTokenPayload extends JwtPayload {
  id:string | number;
  username: string
  profile_picture: string;
}


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


export const getValidAccessTokenAutoSave = async() => {
  
  let token:string | null = null 
  const access = await getAccessToken()
  
  if(jwtDecode(access).exp > Date.now() / 1000){
    token = access
  }else{
    const refresh = await getRefreshToken()
    const tokens = await refreshToken(refresh)
    token = tokens.access
  }
  
  return token 
  
}