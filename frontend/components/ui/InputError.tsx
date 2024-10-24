import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'


type InputErrorProps = TextProps & {
  message: string;
}

export default function InputError(
  { message, style, ...props}: ErrorProps ) {
    
  return (
    <Text {...props} style={[styles.text,style]}>
      { message } 
    </Text>
  )
}

const styles = StyleSheet.create({
  text:{
    color:'red'
  }
})
