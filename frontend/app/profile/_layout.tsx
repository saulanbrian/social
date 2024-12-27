import { useGetUser } from "@/api/queries/user"
import { ThemedActivityIndicator, ThemedText } from "@/components/ui"
import ProfileLayout from "@/layouts/profile"
import { useUserStore } from "@/stores/user"
import { useFocusEffect, useNavigation } from "expo-router"
import { Suspense } from "react"

const tabs = [
  { tabName: 'index', tabLabel:'posts'},
  { tabName: 'photos'},
]

const Layout = () => {

  const { id, username } = useUserStore()
  const { data: user } = useGetUser(id as string)
  const navigation = useNavigation()

  const parentPath = '/profile'

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle:username
    })
  })

  return (
    <ProfileLayout tabs={tabs} user={user} parentPath={parentPath} />
  )
}

const InitialLayout = () => {
  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <Layout />
    </Suspense>
  )
}

export default InitialLayout
