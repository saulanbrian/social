import User from "@/types/user";
import { Avatar, ThemedText, ThemedView } from "../ui";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useThemeContext } from "@/context/theme";
import { useRouter } from "expo-router";

type UserPreviewCardProps = {
  user:User;
  style?:StyleProp<ViewStyle>
}

const UserPreviewCard = ({ user, style }: UserPreviewCardProps ) => {

  const router = useRouter()
  const { theme } = useThemeContext()

  const handlePress = () => {
    router.navigate({
      pathname:'/[user]/',
      params: { user: user.id }
    })
  }

  return (
    <Pressable 
      onPress={handlePress}
      style={
        [
          {
            backgroundColor:theme.colors.background.card
          },
          styles.card,
          style
        ]
      }
    >
      <Avatar source={user?.profile_picture || null } size={48}/>
      <View style={styles.right}>
        <ThemedText style={styles.username}>{ user.username }</ThemedText>
        <ThemedText style={styles.followers}>{ user.followers.length } followers</ThemedText>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card:{
    flexDirection:'row',
    padding:8,
    gap:4,
    borderRadius:4
  },
  followers:{
    fontSize:12
  },
  right:{
    padding:4
  },
  username:{
    fontSize:18
  }
})

export default UserPreviewCard