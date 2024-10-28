import React, { forwardRef, Ref } from 'react'
import {
  TextInput, 
  TextInputProps,
} from 'react-native'

import { useThemeContext } from '../../context/theme'

const CustomTextInput = forwardRef<TextInput, TextInputProps>((
  {style,...props}, ref) => {
  
  const { theme } = useThemeContext()
  
  const defaultStyles = {
    color: theme.colors.tint,
    borderColor: theme.colors.tint,
    borderWidth:1,
  }
  
  return (
    <TextInput
      placeholderTextColor={defaultStyles.color}
      style={[defaultStyles,style]}
      ref={ref}
      {...props}/>
  )
})

export default CustomTextInput
