import React from "react"
import { ThemedView, Avatar, ThemedText } from "../ui"
import { Pressable, StyleSheet, View } from "react-native"

import User from "@/types/user"
import { useThemeContext } from "@/context/theme"
import { useFollowUser, useUnfollowUser } from "@/api/interactions/user"
import { useGetCurrentUser } from "@/api/queries/user"
import { Image } from "expo-image"

const API_URL = process.env.EXPO_PUBLIC_API_URL

const ProfileHeader = ({
  profile_picture,
  background_photo, 
  id, 
  username, 
  bio,
  is_followed,
  followers,
  following
}: User) => {

  const { data: currentUser } = useGetCurrentUser()
  const isCurrentUser = currentUser?.id === id

  return (
    <ThemedView>

      <BackgroundAndProfile isCurrentUser={isCurrentUser} profilePicture={profile_picture} backgroundPhoto={background_photo}/>
      <ActionContainer isCurrentUser={isCurrentUser} isFollowed={is_followed} userId={id}/>
      <ThemedText style={styles.username}>{ username }</ThemedText>
      { bio && <ThemedText style={styles.bio}>{bio}</ThemedText>}
      <FollowersAndFollowing followers={followers} following={following}/>
      
    </ThemedView>
  )
}


const ActionContainer = ({ 
  isFollowed, 
  isCurrentUser ,
  userId
}: {
  isFollowed: boolean | undefined;
  isCurrentUser: boolean;
  userId:string
}) => {

  const { theme } = useThemeContext()
  const { mutate: follow } = useFollowUser()
  const { mutate: unfollow } = useUnfollowUser()
  
  const handlePress = () => {
    if(isCurrentUser){
      //leaving it for now
    }else if(isFollowed !== undefined){
      if(isFollowed){
        unfollow(userId)
      }else{
        follow(userId)
      }
    }
  }

  return (
    <Pressable style={ styles.actionContainer } onPress={handlePress}>
      <ThemedView 
        style={
          [
            { 
              borderColor:!isCurrentUser?( !isFollowed ?theme.colors.tint :theme.colors.tabBarIcon ):theme.colors.tabBarIcon,
              backgroundColor:!isCurrentUser? ( !isFollowed?theme.colors.tint: undefined): undefined
            },
            styles.actionButton
          ]
        }>
        <ThemedText 
          style={{
            textAlign: 'center',
            color:theme.colors.tabBarIcon
          }}>
          { 
            isCurrentUser
            ? 'edit profile'
            : isFollowed 
            ? 'unfollow'
            : 'follow'
          }
        </ThemedText>
      </ThemedView>
    </Pressable>
  )
}


const BackgroundAndProfile = ({
  backgroundPhoto, 
  isCurrentUser,
  profilePicture
} : {
  backgroundPhoto: string | undefined,
  isCurrentUser:boolean,
  profilePicture:string | undefined
}) => {

  const { theme } = useThemeContext()

  return (
    <ThemedView>
      <Image
        source={{ uri: backgroundPhoto && isCurrentUser? API_URL + backgroundPhoto : backgroundPhoto }}
        style={[
          { 
            opacity: backgroundPhoto? 1: 0.7
          },
          styles.backgroundPhoto
        ]}
        placeholderContentFit="cover"
        placeholder={ theme.colorScheme === 'dark'? require('@/assets/images/white-background.png'): require('../../assets/images/black-background.png')}
      />
      <Avatar 
        source={profilePicture? (isCurrentUser? API_URL + profilePicture: profilePicture): null}
        size={160}
        style={styles.profilePicture}
        />
    </ThemedView>
  )
}

const FollowersAndFollowing = ({ followers, following }: { followers: number; following: number}) => {
  return (
    <ThemedView style={{ flexDirection:'row', padding: 8, gap: 4}}>
      <ThemedText>{ followers } followers | </ThemedText>
      <ThemedText>{ following } following</ThemedText>
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  actionButton:{
    borderWidth:1,
    borderRadius:8,
    padding:8,
    minWidth:80,
    justifyContent:'center'
  },
  actionContainer:{
    flexDirection:'row-reverse',
    padding:12
  },
  backgroundPhoto:{
    height:200,
    width:'100%'
  },
  bio:{
    paddingLeft:8,
    fontSize:12,
    letterSpacing:2
  },
  profilePicture:{
    position:'absolute',
    bottom:-50,
    zIndex:1,
    left:4
  },
  username:{
    fontSize:20,
    paddingLeft:8,
    fontWeight:800
  }
})
 
export default ProfileHeader;