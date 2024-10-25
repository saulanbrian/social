import React from 'react'
import { Text, TextProps } from 'react-native'

import { useThemeContext } from '../../context/theme'

type Props = TextProps & {
  children: React.ReactNode
}

export default function CustomText({style,children,...props}:Props){
  
  const { theme } = useThemeContext()
  
  const color = theme.colors.text
  
  return (
    <Text {...props} style={[{color:color},style]} >
      { children }
    </Text>
  )
}
