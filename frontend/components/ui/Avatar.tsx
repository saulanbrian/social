import { Image, ImageProps } from 'expo-image'
import { View, StyleSheet, TouchableOpacityProps , TouchableOpacity } from 'react-native'
 

type AvatarProps = TouchableOpacityProps & {
  source: string;
  size: number;
  imageProps?: ImageProps;
}

const Avatar = ({
  source,
  size,
  imageProps,
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
        style={[styles.image,{ height:size, width:size }]}
        {...imageProps} />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container:{
    borderRadius:360,
    overflow:'hidden'
  },
  image:{
    borderRadius:360
  }
})


export default Avatar;