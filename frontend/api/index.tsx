import axios from 'axios'

const API_URL = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
  baseURL:API_URL,
  headers:{
    'Accept': 'application/json',
    'Content-Type':'application/json'
  }
})

api.interceptors.request.use(async(config) => {
  return config
} )


export default api;