import Ionicons from '@expo/vector-icons/Ionicons'
import { View, StyleSheet, ViewProps } from 'react-native'


type Props = ViewProps & {
  color:string;
  size:number;
  name:string;
  showBadge?: boolean
}


const TabBarIcon = ({
  color,
  size,
  name,
  showBadge,
  style
}: Props) => {
  
  return (
    <View style={[styles.container,style]}>
      <Ionicons color={color} size={size} name={name}/>
      { !!showBadge && <View style={ styles.badge } /> }
    </View>
  )
}

const styles = StyleSheet.create({
  badge:{
    color:'red',
    height:8,
    width:8,
    right:-2,
    borderRadius:4,
    zIndex:5,
    position:'absolute',
    backgroundColor:'#f68484'
  },
  container:{
    position:'absolute',
  }
})

export default TabBarIcon
