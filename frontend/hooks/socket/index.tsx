import { useEffect, useRef, useState, useCallback } from 'react'

import { getValidAccessTokenAutoSave } from '../../utils/authentication/'
import { useAuthContext } from '@/context/authentication';


export const useAuthenticatedWebSocket = (url:string): { socket: WebSocket | null; isConnected: boolean }  => {
  
  const { isAuthenticated } = useAuthContext()
  const [socket,setSocket] = useState<WebSocket | null>(null)
  const [isConnected,setIsConnected] = useState<boolean>(false)
  
  const connect = async() => { 
    
    if(socket) {
      switch(socket.readyState){
        case WebSocket.CONNECTING:
          return
        case WebSocket.OPEN:
          socket.close()
      }
    }
    
    const token = await getValidAccessTokenAutoSave()
    if(!token) return 
    
    const ws = new WebSocket(`${url}?token=${token}`)
    
    ws.onopen = (e) => {
      setSocket(ws)
      setIsConnected(true)
    }
    
    ws.onclose = (e) => {
      setIsConnected(false)
      setTimeout(connect,1000)
    }
    
    ws.onerror = (e) => {
      setIsConnected(false)
      setSocket(null)
    }
    
    // return () => {
    //   ws.close()
    // }
    
  }
  
  useEffect(() => {
    if(isAuthenticated){
      connect()
    }
    
    return () => {
      if(socket) socket.close()
    }
    
  },[url])
  
  return { isConnected, socket }
}