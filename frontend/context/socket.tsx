import React,{ createContext, useContext, useState, useEffect} from 'react'
import { useAuthenticatedWebSocket } from '../hooks/socket'
import { useQueryClient } from '@tanstack/react-query'
import { getValidAccessTokenAutoSave } from '../utils/authentication'
import { infiniteQueryAppendResultAtTop } from '../utils/queries'

const WEBSOCKET_URL = process.env.EXPO_PUBLIC_WS_URL

type GlobalSocketContextType = {
  
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
  const queryClient = useQueryClient()
  const { socket, isConnected } = useAuthenticatedWebSocket(WEBSOCKET_URL)
  
  const appendToNotification = (data) => {
    queryClient.setQueryData(['notifications'], oldData => {
      const newData = infiniteQueryAppendResultAtTop({
        data:oldData,
        newData: data
      })
      return newData
    })
  }
  
  useEffect(() => {
    if(socket){
      
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data)

        switch(data.type){
          case 'notification':
            appendToNotification(data.data)
        }
      }
      
      socket.onopen = (e) => {
        console.log('open')
      }
    }
  },[socket])


  return (
    <GlobalSocketContext.Provider value={{}}>
      { children } 
    </GlobalSocketContext.Provider>
  )
}

