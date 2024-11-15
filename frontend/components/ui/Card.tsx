import React, { forwardRef } from 'react'
import { StyleSheet, ViewProps, View } from 'react-native'
import { useThemeContext } from '../../context/theme'

const Card = forwardRef<View,ViewProps>((
  { children, style, ...props },ref ) => {
  
  const { theme } = useThemeContext()
  
  return (
    <View
      style={
        [
          { backgroundColor: theme.colors.background.card },
          styles.card,
          style
        ]
      } {...props} ref={ref}>
      { children && children } 
    </View>
  )
})



type HeaderProps = ViewProps &  {
  children?: React.ReactNode,
}

Card.Header = ({ children, style, ...props }: HeaderProps ) => {
  
  const { theme } = useThemeContext()
  
  return (
    <View style={[
      { backgroundColor:theme.colors.background.card },
      styles.header,
      style
    ]}>
      { children }
    </View>
  )
}


type FooterProps = ViewProps & {
  children: React.ReactNode
}


Card.Footer = ({ children, style, ...props }: FooterProps ) => {
  return (
    <View style={[styles.footer,style]} {...props}>
      { children }
    </View>
  )
}


const styles = {
  card:{
    padding:8, 
  },
  header:{
    flexDirection:'row',
    gap:8,
  },
  footer:{ 
    flexDirection:'row'
  }
}



export default Card;