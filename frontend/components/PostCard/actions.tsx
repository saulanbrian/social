import { TouchableIcon } from '../ui'
import { View, StyleSheet } from 'react-native'


import { useThemeContext } from '../../context/theme'
import { useLikePost, useUnlikePost } from '../../api/interactions/post'
import { useRouter, usePathname } from 'expo-router'

type Props = {
  postId:string;
  is_liked:boolean
}

const PostActions = ({ postId, is_liked}: Props) => {
  
  const { theme } = useThemeContext()
  const { mutate:likePost, likingPost, status:likeStatus } = useLikePost()
  const { mutate:unlikePost, isPending:unlikingPost, status:unlikeStatus
  } = useUnlikePost()
  const router = useRouter()
  const pathname = usePathname()
  
  const handleLike = () => {
    is_liked? unlikePost(postId): likePost(postId)
  }
  
  return (
    <View style={styles.container}>
     <TouchableIcon 
        name={is_liked? 'heart-sharp':'heart-outline'}
        color={is_liked? theme.colors.tint: theme.colors.text}
        size={24}
        title={'like'}
        style={styles.action}
        onPress={handleLike}
        />
     <TouchableIcon 
        name='chatbubble-outline' 
        color={theme.colors.text}
        size={20}
        title={'comments'}
        style={{
          marginRight:16,
          ...styles.action
        }}
        />
     <TouchableIcon 
        name='repeat-outline' 
        color={theme.colors.text}
        size={24}
        title={'repost'}
        style={styles.action}
        />
    </View>
  )
}


const styles = StyleSheet.create({
  action:{
    flex:1
  },
  container:{
    flex:1,
    flexDirection:'row',
    
  }
})

export default PostActions;