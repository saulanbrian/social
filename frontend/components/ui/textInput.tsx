import React, { forwardRef, Ref } from 'react'
import {
  TextInput, 
  TextInputProps,
  useColorScheme
} from 'react-native'

import { Colors } from '../../constants/Colors'

const CustomTextInput = forwardRef<TextInput, TextInputProps>((
  {style,...props},ref) => {
  
  const theme = useColorScheme()
  const backgroundColor = theme === 'light' ? Colors.light.tint : Colors.dark.tint
  
  const defaultStyles = {
    color: theme === 'light' ? Colors.light.tint : Colors.dark.tint,
    borderColor: theme === 'light' ? Colors.light.tint : Colors.dark.tint,
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
