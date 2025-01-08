import { ThemedActivityIndicator, ThemedText } from "@/components/ui";
import { Suspense, useLayoutEffect } from "react";
import ProfileLayout from "@/layouts/profile";

import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useGetCurrentUser, useGetUser } from "@/api/queries/user";
import { CustomTabBarTabType } from "@/components/CustomTabBar";
import { Pressable } from "react-native";
import { useFollowUser, useUnfollowUser } from "@/api/interactions/user";
import { useThemeContext } from "@/context/theme";


const tabs: CustomTabBarTabType[] = [
  { tabName: 'index', tabLabel: 'posts' },
  { tabName: 'photos-preview',tabLabel:'photos' }
]

const UserProfileLayout = () => {
  const { user: userId } = useLocalSearchParams()
  const { data: user } = useGetUser(userId as unknown as number);
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:user.username
    })
  })

  return (
    <ProfileLayout 
      tabs={tabs} 
      user={user} 
      parentPath={`/${userId}`}  />
  )
}


const InitialLayout = () => {

  const { data: currentUser } = useGetCurrentUser()
  const { user: userId } = useLocalSearchParams()

  if(currentUser?.id === userId ) return <Redirect href={'/profile'}/>

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <UserProfileLayout />
    </Suspense>
  );
}

export default InitialLayout;
