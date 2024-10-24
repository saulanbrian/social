import { useColorScheme, ViewProps, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

type Props = ViewProps & {
  children: ReactNode;
}

export default function CustomView({ children, style, ...props } : Props) {
  
  const theme = useColorScheme()
  const backgroundColor = theme === 'light'? Colors.light.background: Colors.dark.background
  
  return (
    <View style={{ backgroundColor,...style }} {...props} >
      { children }
    </View>
  )
}