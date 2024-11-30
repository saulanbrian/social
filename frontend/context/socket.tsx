import React,{ createContext, useContext, useState } from 'react'
import { getValidAccessTokenAutoSave } from '../utils/authentication'
import {Alert} from 'react-native'

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
    
    let socket: WebSocket | null = null
    
    const connect = async() => {
      const token = await getValidAccessTokenAutoSave()
      socket = new WebSocket(`${WEBSOCKET_URL}?token=${token}`)
      
      socket.onopen = () => {
        setIsConnected(true)
      }
      
      socket.onclose = () => {
        setIsConnected(false)
        
        setTimeout(connect,5000)
      }
      
      socket.onmessage = (e) => {
        setTimeout(() => {
          console.log(e)
          Alert.alert('notifiication received')
        },10000)
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