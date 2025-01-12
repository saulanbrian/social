import { forwardRef } from 'react'
import { useThemeContext } from '../../context/theme'
import { TextInputProps, TextInput, StyleSheet } from 'react-native'

const FlatInput = forwardRef<TextInput,TextInputProps>(({
  style,
  value,
  ...props
}, ref ) => {
    
  const { theme } = useThemeContext()
  
  return (
    <TextInput
      ref={ref} 
      value={value}
      style={
        [
          {
            backgroundColor:theme.colors.background.card,
            color:theme.colors.text,
            borderRadius:8,
            opacity: value? 1: 0.7
          },
          style
        ]
      }
      placeholderTextColor={theme.colors.text}
      { ...props }
      />
  )
})


export default FlatInput;