import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { getValidAccessTokenAutoSave, getAccessToken, refreshToken} from '../utils/authentication'

const API_URL = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
  baseURL:`${API_URL}/`,
  // headers:{
  //   'Accept': 'application/json',
  //   'Content-Type':'application/json'
  // }
})

api.interceptors.request.use(async(config) => {
  
  const token = await getValidAccessTokenAutoSave()
  
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
} )


export default api;