import { useGetUser } from "@/api/queries/user";
import { ThemedActivityIndicator, ThemedText } from "@/components/ui";
import { ProfileLayout } from "@/layouts"
import { useUserStore } from "@/stores/user";
import { Redirect, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { Suspense, useCallback } from "react";
import { ActivityIndicator } from "react-native";

const tabs = [
  { tabName: 'index', tabLabel: 'posts'},
  { tabName: 'photos', tabLabel: 'posts'}
]

const UserProfileLayout = () => {

  const navigation = useNavigation()
  const { user: userId } = useLocalSearchParams()
  const { data:user } = useGetUser(userId as unknown as number)

  useFocusEffect(useCallback(() => {
    if(user){
      navigation.setOptions({
        headerTitle:user.username
      })
    }
  },[user]))

  return <ProfileLayout tabs={tabs} tabBarWith={146} user={user} />
}

const MainLayout = () => {

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <UserProfileLayout />
    </Suspense>
  )
}

export default MainLayout;