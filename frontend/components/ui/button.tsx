import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme
} from 'react-native'

import { Colors } from '../../constants/Colors'

type Props = TouchableOpacityProps & {
  children: React.ReactNode
}

export default function CustomButton({children,style,...props}: Props){
  
  const theme = useColorScheme()
  const backgroundColor = theme === 'light' ? Colors.light.tint : Colors.dark.tint
  
  return (
    <TouchableOpacity {...props} style={{ backgroundColor,...style}} >
      { children }
    </TouchableOpacity>
  )
}
