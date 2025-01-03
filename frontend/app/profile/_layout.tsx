import { useGetCurrentUser, useGetUser } from "@/api/queries/user"
import { AutoCenteredActivityIndicator } from "@/components"
import { CustomTabBarTabType } from "@/components/CustomTabBar"
import { ThemedActivityIndicator, ThemedText } from "@/components/ui"
import ProfileLayout from "@/layouts/profile"
import User from "@/types/user"
import { useFocusEffect, useNavigation } from "expo-router"
import { Suspense } from "react"

const tabs: CustomTabBarTabType[] = [
  { tabName: 'index', tabLabel:'posts'},
  { tabName: 'photos-preview',tabLabel:'photos'}
]

const Layout = () => {

  const { data:user} = useGetCurrentUser()
  const navigation = useNavigation()

  const parentPath = '/profile'

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle:user?.username
    })
  })
  
  return (
    <ProfileLayout tabs={tabs} user={user as User} parentPath={parentPath}/>
  )
}

const InitialLayout = () => {
  return (
    <Suspense fallback={<AutoCenteredActivityIndicator />}>
      <Layout />
    </Suspense>
  )
}

export default InitialLayout
