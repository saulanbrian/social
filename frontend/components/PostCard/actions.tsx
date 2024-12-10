import { TouchableIcon } from '../ui'
import { View, StyleSheet } from 'react-native'


import { useThemeContext } from '../../context/theme'
import { useLikePost, useUnlikePost } from '../../api/interactions/post'
import { useRouter, usePathname } from 'expo-router'

type Props = {
  postId:string;
  is_liked:boolean;
}

const PostActions = ({ postId, is_liked }: Props) => {
  
  const { theme } = useThemeContext()
  const { mutate:likePost, isPending:likingPost, status:likeStatus } = useLikePost()
  const { mutate:unlikePost, isPending:unlikingPost, status:unlikeStatus
  } = useUnlikePost()

  const handleLike = () => {
    is_liked? unlikePost(postId): likePost(postId)
  }
  
  return (
    <View style={styles.container}>
     <TouchableIcon 
        name={is_liked? 'heart-sharp':'heart-outline'}
        color={is_liked? theme.colors.tint: theme.colors.text}
        size={26}
        style={styles.action}
        onPress={handleLike}
        disabled={ likingPost || unlikingPost }
        />
     <TouchableIcon 
        name='chatbubble-outline' 
        color={theme.colors.text}
        size={22}
        style={styles.action}
        />
     <TouchableIcon 
        name='paper-plane-outline' 
        color={theme.colors.text}
        size={22}
        style={styles.action}
        />
     <TouchableIcon 
        name='bookmark-outline' 
        color={theme.colors.text}
        size={24}
        style={
          [
            styles.action,
            { marginLeft:'auto' }
          ]
        }
        />
    </View>
  )
}


const styles = StyleSheet.create({
  action:{
    
  },
  container:{
    flex:1,
    flexDirection:'row',
    gap:6
  }
})

export default PostActions;