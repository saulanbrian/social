import React,{ createContext, useContext, useState } from 'react'
import { getValidAccessTokenAutoSave } from '../utils/authentication'

const WEBSOCKET_URL = process.env.EXPO_PUBLIC_WS_URL

type GlobalSocketContextType = {
  connected:boolean,
}

const GlobalSocketContext = createContext<GlobalSocketContextType | null>(null)

export const useGlobalSocketContext = () => {
  const context = useContext(GlobalSocketContext)
  if(!context) throw new Error('cannot use Global socketContext outside GlobalSocketProvider')
  return context
}


type Props = {
  children: React.ReactNode
}


export const GlobalSocketContextProvider = ({ children }: Props) => {
  const [connected,setIsConnected] = useState(false)

  React.useEffect(() => {
    
    const connect = async() => {
      const token = await getValidAccessTokenAutoSave()
      const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`)
      
      ws.onopen = () => {
        setIsConnected(true)
      }
      
      ws.onclose = () => {
        setIsConnected(false)
        
        setTimeout(connect,5000)
      }
      
    }
    
    connect()
    
    return () => { 
      if(socket) socket.close()
    }
    
  },[])

  return (
    <GlobalSocketContext.Provider value={{connected}}>
      { children } 
    </GlobalSocketContext.Provider>
  )
}