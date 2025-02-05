import { PostImageListPreview } from "@/components";

import React, { Suspense } from "react";
import { useGetCurrentUser, useGetUserImages } from "@/api/queries/user";
import { ThemedActivityIndicator } from "@/components/ui";
import { summarizeQueryPagesResult } from "@/utils/queries";
import { Href, usePathname, useRouter } from "expo-router";
import Animated, { useAnimatedRef, useAnimatedStyle } from "react-native-reanimated";
import { useProfileLayoutContext } from "@/context/profile-layouts";
import { FlatList, View } from "react-native";
import { Image } from "expo-image";

const ProfilePhotosPreviewPage = () => {
  const { data: user } = useGetCurrentUser();

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <UserImagesPreview userId={user?.id as string} />
    </Suspense>
  );
};

const UserImagesPreview = React.memo(({ userId }: { userId: string }) => {

  const router = useRouter()
  const pathname = usePathname()
  const { data } = useGetUserImages(userId);
  const { headerHeight, childrenScrollOffsetY } = useProfileLayoutContext()

  return (
    <View style={{ paddingTop: headerHeight }}>
      <Animated.FlatList
        data={summarizeQueryPagesResult(data)}
        horizontal
        keyExtractor={item => item.post_id}
        renderItem={({ item }) => (
          <Image 
            source={{ uri: item.image }} 
            style={{
              height:200,
              width:200
            }}
          />
        )}
      />
    </View>
  );
});



export default ProfilePhotosPreviewPage;
