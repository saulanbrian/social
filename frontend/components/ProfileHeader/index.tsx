import React from "react"
import { ThemedView, Avatar, ThemedText } from "../ui"
import { StyleSheet } from "react-native"

import User from "@/types/user"

const ProfileHeader = ({ id, profile_picture, username}: User) => {
  return (
    <ThemedView style={styles.container}>
      <Avatar 
        size={200}
        style={styles.imageContainer}
        source={profile_picture}
        shape='square'
        imageProps={{
          priority:'high',
          cachePolicy:'memory-disk',
        }}
        />
      <ThemedText style={styles.username}>{ username }</ThemedText>
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  container:{
    padding: 8,
  },
  imageContainer:{
    
  },
  username:{
    textAlign:'left',
    marginTop:4,
    fontSize:20,
    fontWeight:600,
  }
})

export default React.memo(ProfileHeader)