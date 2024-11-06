import React from 'react'
import { ThemedView } from '../ui'
import { StyleSheet, ViewProps } from 'react-native'
import { useThemeContext } from '../../context/theme'

type Props = ViewProps & {
  children? : React.ReactNode
}

const Card = ( { children, style, ...props } : Props ) => {
  
  const { theme } = useThemeContext()
  
  return (
    <ThemedView
      style={
        [
          { backgroundColor: theme.colors.background.card },
          styles.card,
          style
        ]
      } {...props}>
      { children && children } 
    </ThemedView>
  )
}

const styles = {
  card:{
    borderRadius:4
  }
}

export default Card;