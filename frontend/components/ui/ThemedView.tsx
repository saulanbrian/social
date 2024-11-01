import { ViewProps, View, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeContext } from '../../context/theme'


type Props = ViewProps & {
  children?: React.ReactNode;
  secondary?: boolean
}

export default function CustomView({ children, style, secondary, ...props } : Props) {
  
  const { theme } = useThemeContext()
  const backgroundColor = secondary? theme.colors.secondary: theme.colors.primary
  
  return (
    <View style={[{ backgroundColor },style]} {...props} >
      { children }
    </View>
  )
}