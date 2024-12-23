import { ThemedActivityIndicator } from "@/components/ui";
import { Suspense } from "react";
import ProfileLayout from "@/layouts/profile";

import { useLocalSearchParams } from "expo-router";
import { useGetUser } from "@/api/queries/user";


const tabs = [
  { tabName: 'index', tabLabel: 'posts' },
  { tabName: 'photos' }
]

const UserProfileLayout = () => {
  const { user: userId } = useLocalSearchParams()
  const { data: user } = useGetUser(userId as unknown as number);

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
