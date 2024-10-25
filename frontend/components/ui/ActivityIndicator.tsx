import { ActivityIndicator, ActivityIndicatorProps , useColorScheme } from 'react-native'
import { Colors } from '../../constants/Colors'


export default function CustomActivityIndicator(props:ActivityIndicatorProps) {
  const theme = useColorScheme()
  const color = theme === 'light'? Colors.light.text: Colors.dark.text
  
  return (
    <ActivityIndicator color={color} {...props}/>
  )
}