import { SearchItem } from "@/types/search"
import { Pressable, PressableProps, StyleSheet, View } from "react-native"
import { Avatar, ThemedText } from "../ui"
import { useRouter } from "expo-router"
import { useSearchStore } from "@/stores/search"
import { Post } from "@/types/post"
import User from "@/types/user"
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { useThemeContext } from "@/context/theme"
import { useCallback, useMemo } from "react"


type SearchItemComponentProps = Omit<PressableProps,('onPress' | 'style')> & {
  item: SearchItem
}

const SearchItemComponent = ({ item, ...props }: SearchItemComponentProps ) => {

  const { addToHistory, history } = useSearchStore()
  const router = useRouter()

  const handlePress = () => { 

    if(!history.some(historyItem => historyItem === item)){
      addToHistory(item)
    }
    
    if(typeof item === 'string'){
      router.push({
        pathname:'/search/[keyword]',
        params: { keyword: item }
      })
    }else{
      router.push({
        pathname:'/[user]',
        params: { user: item.id }
      })
    }
  }

  return (
    <Pressable onPress={handlePress} style={styles.container} {...props}>
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
    <View style={styles.itemComponent}>
      <ThemedText style={styles.itemComponentText}>{ keyword }</ThemedText>
      <Feather name="arrow-up-right" size={28} color={theme.colors.text} style={{opacity:0.5}} />
    </View>
  )
}


const UserSearchItemComponent = ({ user }: { user: User }) => {
  return (
    <View style={styles.itemComponent}>
      <Avatar source={user.profile_picture || null } size={40}/>
      <ThemedText style={styles.itemComponentText}>{user.username}</ThemedText>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:4,
    gap:4
  },
  itemComponent:{
    flexDirection:'row',
    flex:1,
    padding:12,
    gap:8,
    alignItems:'center'
  },
  itemComponentText:{
    flexGrow:1,
    padding:4,
    fontSize:16,
  }
})

export default SearchItemComponent