import { SearchItem } from "@/types/search"
import { Pressable, PressableProps, StyleSheet, View } from "react-native"
import { Avatar, ThemedText, ThemedView } from "../ui"
import { Href, useRouter } from "expo-router"
import { useSearchStore } from "@/stores/search"
import { Post } from "@/types/post"
import User from "@/types/user"
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { useThemeContext } from "@/context/theme"
import React, { useCallback, useMemo } from "react"


type SearchItemComponentProps = PressableProps & {
  item: SearchItem
}

const SearchItemComponent = ({ item, style, ...props}: SearchItemComponentProps ) => {

  return (
    <Pressable style={
      ({ pressed, hovered }) => [
        styles.container,
        style && typeof style === 'function'? style({ pressed, hovered}): style
      ]}
      { ...props }  
    >
      { 
        typeof item === 'string'
          ? <KeywordSearchItemComponent keyword={item}/>
          : <UserSearchItemComponent user={item} />
      }
    </Pressable>
  )
}

const KeywordSearchItemComponent = ({ keyword }: { keyword: string }) => {

  const { theme }  = useThemeContext()

  return (
    <React.Fragment>
      <ThemedText style={styles.itemComponentText}>{ keyword }</ThemedText>
      <Feather name="arrow-up-right" size={28} color={theme.colors.text} style={{opacity:0.5}} />
    </React.Fragment>
  )
}


const UserSearchItemComponent = ({ user }: { user: User }) => {
  return (
    <React.Fragment>
      <Avatar source={user.profile_picture || null } size={40}/>
      <ThemedText style={styles.itemComponentText}>{user.username}</ThemedText>
    </React.Fragment>
  )
}


const styles = StyleSheet.create({
  container:{
    padding:8,
    alignItems:'center',
    gap:4,
    flexDirection:'row'
  },
  itemComponentText:{
    flexGrow:1,
    padding:4,
    fontSize:16,
  }
})

export default SearchItemComponent