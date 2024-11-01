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
          { borderColor: theme.colors.text },
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
    borderWidth:1,
    borderRadius:8,
  }
}

export default Card;