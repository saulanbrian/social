import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacity, TouchableOpacityProps, StyleSheet  } from 'react-native'
import ThemedText from './ThemedText'

type Props = TouchableOpacityProps & {
  size:number;
  name:string;
  color:string;
  title?:string;
  fontSize?:number
}

const TouchableIcon = ({
  size, 
  name,
  color,
  title,
  style,
  fontSize,
  ...props
}: Props) => {
  return (
    <TouchableOpacity 
      style={[styles.container,style]}
      {...props}>
      <Ionicons name={name} size={size} color={color} />
      { title && (
        <ThemedText style={{fontSize:fontSize}}> { title }</ThemedText>
      ) }
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginRight:1
  },
})

export default TouchableIcon;