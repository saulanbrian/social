import { ThemedActivityIndicator } from "@/components/ui";
import { Suspense, useLayoutEffect } from "react";
import ProfileLayout from "@/layouts/profile";

import { useLocalSearchParams, useNavigation } from "expo-router";
import { useGetUser } from "@/api/queries/user";


const tabs = [
  { tabName: 'index', tabLabel: 'posts' },
  { tabName: 'photos' }
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

  return <ProfileLayout tabs={tabs} user={user} parentPath={`/${userId}`} />;
}

const InitialLayout = () => {
  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <UserProfileLayout />
    </Suspense>
  );
}

export default InitialLayout;
