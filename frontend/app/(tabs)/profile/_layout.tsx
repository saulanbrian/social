import { useGetUser } from "@/api/queries/user"
import { ThemedActivityIndicator, ThemedText } from "@/components/ui"
import ProfileLayout from "@/layouts/profile"
import { useUserStore } from "@/stores/user"
import { Suspense } from "react"

const tabs = [
  { tabName: 'index'},
  { tabName: 'photos'}
]

const Layout = () => {
  const { id } = useUserStore()
  const { data: user } = useGetUser(id as string)
  const parentPath = '/profile'

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
