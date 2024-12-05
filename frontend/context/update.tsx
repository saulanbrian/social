import React, { createContext, useContext, useState } from 'react'

import { Notification as NotificationType } from '../types/notification'

type UpdateContextType = {
  freshNotifications:NotificationType[],
  setFreshNotifications:React.Dispatch<React.SetStateAction<NotificationType[]>>
}

const UpdateContext = createContext<UpdateContextType | null>(null)


export const useUpdateContext = () => {
  const context = useContext(UpdateContext)
  if(!context) throw new Error('can\'t use update contwxt outside update context provider')
  return context
}

const UpdateContextProvider = ({ 
  children
}: { children: React.ReactNode }) => {
  
  const [freshNotifications,setFreshNotifications] = useState<NotificationType[]>([])
  
  return (
    <UpdateContext.Provider value={{
      freshNotifications,
      setFreshNotifications
    }}>
      { children } 
    </UpdateContext.Provider>
  )
}

export default UpdateContextProvider;
