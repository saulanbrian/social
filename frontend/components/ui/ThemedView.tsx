import { ViewProps, View, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeContext } from '../../context/theme'


type Props = ViewProps & {
  children?: React.ReactNode;
}

export default function CustomView({ children, style, ...props } : Props) {
  
  const { theme } = useThemeContext()
  const backgroundColor = theme.colors.background.default
  
  return (
    <View style={[{ backgroundColor },style]} {...props} >
      { children }
    </View>
  )
}