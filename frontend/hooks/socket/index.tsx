import { useEffect, useRef, useState, useCallback } from 'react'

import { getValidAccessTokenAutoSave } from '../../utils/authentication/'

type ReturnType = {
  socket: WebSocket | null;
  isConnected: boolean;
}


export const useAuthenticatedWebSocket = (url:string): ReturnType  => {
  
  const [socket,setSocket] = useState<WebSocket | null>(null)
  const [isConnected,setIsConnected] = useState<boolean>(false)
  
  const connect = async() => { 
    
    if(socket) {
      switch(socket.readyState){
        case WebSocket.CONNECTING:
          return
        case WebSocket.CONNECTED:
          socket.close()
      }
    }
    
    const token = await getValidAccessTokenAutoSave()
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
    
    return () => {
      ws.close()
    }
    
  }
  
  useEffect(() => {
    connect()
    
    return () => {
      if(socket) socket.close()
    }
    
  },[url])
  
  return { isConnected, socket }
}