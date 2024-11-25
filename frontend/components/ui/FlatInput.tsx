import { forwardRef } from 'react'
import { useThemeContext } from '../../context/theme'
import { TextInputProps, TextInput, StyleSheet } from 'react-native'

const FlatInput = forwardRef<TextInput,TextInputProps>((
  {style, ...props }, ref ) => {
    
  const { theme } = useThemeContext()
  
  return (
    <TextInput
      ref={ref} 
      style={
        [
          {
            backgroundColor:theme.colors.background.card,
            color:theme.colors.text
          },
          styles.input,
          style
        ]
      }
      placeholderTextColor={theme.colors.text}
      { ...props }
      />
  )
})

const styles = StyleSheet.create({
  input:{
    borderRadius:4,
  }
})

export default FlatInput;