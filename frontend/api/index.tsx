import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { getRefreshToken, getAccessToken, refreshToken} from '../utils/authentication'

const API_URL = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
  baseURL:API_URL,
  headers:{
    'Accept': 'application/json',
    'Content-Type':'application/json'
  }
})

api.interceptors.request.use(async(config) => {
  
  const access = await getAccessToken()
  
  let latestToken:string;
  
  if(access){
    const decoded = jwtDecode(access)
    if(Date.now() / 1000 < decoded.exp){
      latestToken = access
    }else{
      const refresh = await getRefreshToken()
      latestToken = refreshToken(refresh)
    }
  }
  
  
  if(latestToken){
    config.headers.Authorization = `Bearer ${latestToken}`
  }
  
  return config
} )


export default api;