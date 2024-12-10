import { Image, ImageProps } from 'expo-image'
import { View, StyleSheet, TouchableOpacityProps , TouchableOpacity } from 'react-native'
 

type AvatarProps = TouchableOpacityProps & {
  source: string;
  size: number;
  imageProps?: ImageProps;
  shape?: 'circle' | 'square'
}

const Avatar = ({
  source,
  size,
  imageProps,
  shape='circle',
  style,
  ...props
}: AvatarProps) => {
  
  return (
    <TouchableOpacity style={
      [
        { height:size, width:size },
        styles.container,
        style
      ]
    } { ...props }>
      <Image 
        placeholder={require('../../assets/images/profile.png')}
        source={{ uri: source }} 
        style={
          [
            shape === 'circle'? styles.circle: styles.square,
            { height:size, width:size },
          ]
        }
        cachePolicy='memory-disk'
        {...imageProps} />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container:{
    overflow:'hidden'
  },
  circle:{
    borderRadius:360
  },
  square:{
    borderRadius:8
  }
})


export default Avatar;