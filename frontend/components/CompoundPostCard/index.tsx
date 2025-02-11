import { Post } from "@/types/post";
import PostContextProvider, { usePostContext } from "./context";
import { Avatar, ThemedText, ThemedView, TouchableIcon } from "../ui";
import { DimensionValue, Pressable, StyleSheet, View, ViewProps } from "react-native";
import { Image, ImageProps, ImageStyle } from "expo-image";
import React from "react";
import { useThemeContext } from "@/context/theme";
import { useLikePost, useUnlikePost } from "@/api/interactions/post";
import { useNavigation, useRouter } from "expo-router";


type CompoundPostCardProps = ViewProps & {
  post:Post
}


const CompoundPostCard = ({ post, children, style }: CompoundPostCardProps) => {
  
  const { theme } = useThemeContext()
  const router = useRouter()

  const handlePress = () => {
    router.navigate({
      pathname:'/post/[id]',
      params:{ id: post.id }
    })
  }

  return (
    <PostContextProvider post={post}>
      <Pressable 
        style={
          [
            styles.container,
            {
              backgroundColor:theme.colors.background.card,
            },
            style
          ]
        }
        onPress={handlePress}
      >
        { children }
      </Pressable>
    </PostContextProvider>
  )
}


CompoundPostCard.Header = ({ style, ...props}: ViewProps) => {

  const { post: { author_username, author_profile, author_id } } = usePostContext()
  const { theme } = useThemeContext()

  return (
    <View style={[styles.section, styles.header, style ]} {...props}>
      <Avatar 
        source={ API_URL + author_profile} 
        size={40} 
        shape="square"
        autolinkToProfile
        userId={author_id}/>
      <View>
        <ThemedText style={styles.username}>{ author_username }</ThemedText>
        <ThemedText style={{ fontSize: 12 }}>6h ago</ThemedText>
      </View>
      <TouchableIcon 
        size={16}
        color={theme.colors.text}
        name='ellipsis-vertical' 
        style={{
          marginLeft:'auto',
          position:'absolute',
          right:8,
          top:8
        }}
      />
    </View>
  )
}


CompoundPostCard.Image = ({ style, imageStyle, ...props}: ViewProps & { imageStyle?: ImageStyle }) => {

  const { post: { image }} = usePostContext()

  return image && (
    <View style={[styles.section, style]} {...props}>
      <Image source={{ uri: image}} style={[{ aspectRatio: 1 },imageStyle]}/>
    </View>
  )
}



CompoundPostCard.Caption = () => {
  const { post: { caption } } = usePostContext()

  return caption && (
    <View style={styles.section}> 
      <ThemedText>{ caption }</ThemedText>
    </View>
  )
}


CompoundPostCard.Actions = ({ style, ...props }: ViewProps) => {

  const { theme } = useThemeContext()
  const { post: { id, is_liked, author_id } } = usePostContext()
  const { mutate: like, isPending: likingPost} = useLikePost()
  const { mutate: unlike, isPending: unlikingPost} = useUnlikePost()

  const handleLike = () => {
    if(is_liked){
      unlike({ id, authorId: author_id })
    }else{
      like({ id, authorId: author_id })
    }
  }

  return (
    <View style={[styles.section,styles.actions,style]} {...props}>
      <TouchableIcon  
        name={ is_liked? 'heart-sharp': 'heart-outline'}
        color={is_liked? theme.colors.tint: theme.colors.text}
        size={26}
        disabled={ likingPost || unlikingPost? true: false}
        onPress={handleLike}
      />
      <TouchableIcon 
        name='chatbubble-outline' 
        color={theme.colors.text}
        size={22}
      />
      <TouchableIcon 
        name='paper-plane-outline' 
        color={theme.colors.text}
        size={22}
      />
      <TouchableIcon 
        name='bookmark-outline' 
        color={theme.colors.text}
        size={24}
        style={{ marginLeft: 'auto' }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  actions:{
    flexDirection:'row',
    gap:4,
  },
  container:{

  },
  header:{
    flexDirection:'row',
    gap:4,
    alignItems:'center',
    position:'relative'
  },
  section:{
    paddingHorizontal:8,
    paddingVertical:2,
  },
  username:{
    fontSize:16,
    fontWeight:800
  }
})

const API_URL = process.env.EXPO_PUBLIC_API_URL

export default CompoundPostCard