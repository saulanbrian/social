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
      <ActionContainer isCurrentUser={isCurrentUser} isFollowed={is_followed}/>
      <ThemedText style={styles.username}>{ username }</ThemedText>
      { bio && <ThemedText style={styles.bio}>{bio}</ThemedText>}
      <FollowersAndFollowing followers={followers} following={following}/>
      
    </ThemedView>
  )
}


const ActionContainer = ({ isFollowed, isCurrentUser }: { isFollowed: boolean | undefined; isCurrentUser: boolean}) => {

  const { theme } = useThemeContext()

  return (
    <ThemedView style={ styles.actionContainer }>
      <ThemedView 
        style={
          [
            { 
              borderColor:theme.colors.tabBarIcon,
            },
            styles.actionButton
          ]
        }>
        <ThemedText style={{ textAlign: 'center' }}>
          { 
            isCurrentUser
            ? 'edit profile'
            : isFollowed 
            ? 'unfollow'
            : 'follow'
          }
        </ThemedText>
      </ThemedView>
    </ThemedView>
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

const FollowersAndFollowing = ({ followers, following }: { followers: string[]; following: string[]}) => {
  return (
    <ThemedView style={{ flexDirection:'row', padding: 8, gap: 4}}>
      <ThemedText>{ followers.length } followers | </ThemedText>
      <ThemedText>{ following.length } following</ThemedText>
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