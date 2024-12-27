import { useUserStore } from '@/stores/user';
import { Image, ImageProps } from 'expo-image'
import { useNavigation, useRouter } from 'expo-router';
import { View, StyleSheet, TouchableOpacityProps , TouchableOpacity } from 'react-native'
 

type AvatarProps = TouchableOpacityProps & {
  source: string | null;
  size: number;
  imageProps?: ImageProps;
  shape?: 'circle' | 'square',
} & (
  | { 
      autolinkToProfile?: true,
      userId:string 
    }
  | {
      autolinkToProfile?:false,
      userId?: never
    }
)

const Avatar = ({
  source,
  size,
  imageProps,
  shape='circle',
  style,
  autolinkToProfile=false,
  userId,
  ...props
}: AvatarProps) => {

  const router = useRouter()
  const { id: currentUserId } = useUserStore()
  
  
  const handlePress = () => {
    if(autolinkToProfile && userId) {
      userId === currentUserId 
      ? router.navigate('/profile')
      : router.navigate(`/${userId}`)
    }
  }
   
  return (
    <TouchableOpacity style={[{ height:size, width:size }, styles.container, style]} { ...props } onPress={handlePress}>
      <Image 
        placeholder={require('../../assets/images/profile.png')}
        source={{ uri: source }} 
        style={{
          height:size,
          width:size,
          borderRadius: shape === 'circle' ? 360: 8
        }}
        cachePolicy='memory-disk'
        {...imageProps} />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container:{
    overflow:'hidden'
  }
})


export default Avatar;