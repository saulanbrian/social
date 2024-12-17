import { useGetUser } from "@/api/queries/user"
import { ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import { Colors } from "@/constants/Colors"
import { ProfileLayout } from "@/layouts"
import { useUserStore } from "@/stores/user"
import User from "@/types/user"
import { Suspense } from "react"
import { Appearance, StyleSheet, TouchableOpacity } from "react-native"


const profileTabs = [
  { tabName: 'index', tabLabel:'posts'},
  { tabName: 'photos', tabLabel:'photos'}
]

const TabProfileLayout = () => {
  const { id } = useUserStore()
  const { data: user } = useGetUser(id as string)

  return (
    <ProfileLayout tabs={ profileTabs } tabBarWith={160} user={user} >

      <TouchableOpacity style={styles.editButton}>
        <ThemedText style={{ textAlign:'center'}}> EDIT YOUR PROFILE </ThemedText>
      </TouchableOpacity>

    </ProfileLayout>
  )
}


const MainLayout = () => {
  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <TabProfileLayout />
    </Suspense>
  )
}


const styles = StyleSheet.create({
  editButton:{
    borderRadius:8,
    padding:16,
    marginHorizontal:8,
    marginBottom:12,
    justifyContent:'center',
    backgroundColor: Appearance.getColorScheme() == "dark" ? Colors.dark.background.card : Colors.light.background.card
  }
})

export default MainLayout;