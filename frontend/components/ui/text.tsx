import React from 'react'
import { Text, TextProps, useColorScheme } from 'react-native'

import { Colors } from '../../constants/Colors'

type Props = TextProps & {
  children: React.ReactNode
}

export default function CustomText({style,children,...props}:Props){
  
  const theme = useColorScheme()
  
  const color = theme === 'light' ? Colors.light.text : Colors.dark.text
  
  return (
    <Text 
      {...props} 
      style={[{color:color},style]} >
      { children }
    </Text>
  )
}
