import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { useThemeContext } from '../../context/theme'

type Props = TouchableOpacityProps & {
  children: React.ReactNode
}

export default function CustomTO({children,style,disabled,...props}: Props){
  
  const { theme } = useThemeContext()
  const backgroundColor = theme.colors.tint
  const opacity = disabled && 0.5
  
  return (
    <TouchableOpacity 
      disabled={disabled}
      style={{ backgroundColor,opacity,...style}}
      {...props} >
      { children }
    </TouchableOpacity>
  )
}
