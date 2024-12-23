import { ScrollView, ScrollViewProps } from 'react-native'
import React from 'react'
import { useThemeContext } from '@/context/theme'


const ThemedScrollView = ({style, children, ...props}:ScrollViewProps) => {

  const { theme } = useThemeContext()

  return (
    <ScrollView 
      style={
        [
          { backgroundColor: theme.colors.background.card },
          style
        ]
      }
      { ...props }
    >
      {children}
    </ScrollView>
  )
}

export default ThemedScrollView