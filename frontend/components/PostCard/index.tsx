import { Card, Avatar,ThemedText, TouchableIcon } from '../ui'
import PostActions from './actions'
import { StyleSheet, View, ViewProps,} from 'react-native'
import { Image } from 'expo-image'
import Ionicons  from '@expo/vector-icons/Ionicons'

import { Post } from '../../types'

import { useRef } from 'react'
import { useThemeContext } from '../../context/theme'

const API_URL = process.env.EXPO_PUBLIC_API_URL


type PostProps = ViewProps & {
  post: Post;
  imageShown?: boolean
}


const PostCard = ({ post, style,imageShown=true, ...props} : PostProps) => {
  
  const { theme } = useThemeContext()
  const containerRef = useRef<View>(null)
  const containerWidth = containerRef.current?.measure((x,y,width,height) =>  width)
  
  return (
    <Card style={[styles.card, style]} {...props} ref={containerRef} >
    
      <Card.Header>
        <Avatar 
          size={48}
          source={ API_URL + post.author_profile} />
        <View>
          <ThemedText style={styles.username}>
            { post.author_username } 
          </ThemedText>
          <ThemedText style={styles.date}>
            6h ago
          </ThemedText>
        </View>
      </Card.Header>
      
      <View style={styles.content} >
      { post.caption && (
        <ThemedText style={styles.caption}>
          { post.caption }
        </ThemedText>
      ) } 
      
      { post.image && imageShown && (
        <Image 
          source={post.image}
          style={[
            { width: containerWidth },
            styles.image
          ]}/>
      ) }
      </View>
      
      <Card.Footer style={styles.footer}>
        <PostActions postId={post.id} is_liked={post.is_liked}/>
      </Card.Footer>
      
    </Card>
  )
}

const styles = StyleSheet.create({
  caption:{
    fontSize:14,
  },
  card:{
    overflow:'clipped'
  },
  content:{
    marginVertical:12,
    gap:8,
    overflow:"clipped",
  },
  date:{
    fontSize:12
  },
  footer:{
    flex:1,
  },
  image:{
    contentFit:'cover',
    aspectRatio:1,
    borderRadius:2,
    maxHeight:300
  },
  username:{
    fontSize:16,
    fontWeight:700,
    paddingTop:2
  }
})

export default PostCard;