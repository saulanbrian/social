import { PostImageListPreview } from "@/components";

import React, { Suspense } from "react";
import { useGetCurrentUser, useGetUserImages } from "@/api/queries/user";
import { ButtonLink, ThemedActivityIndicator, ThemedText } from "@/components/ui";
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

  const { data } = useGetUserImages(userId);
  const { headerHeight  } = useProfileLayoutContext()

  const images = summarizeQueryPagesResult(data)

  return (
    <View style={{ paddingTop: headerHeight }}>
      <Animated.FlatList
        data={images.slice(0,4)}
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
      {
        images.length > 4 && (
          <ButtonLink 
            href={`/images/user/${userId}`} 
            text="see all" 
            style={{padding:4,paddingLeft:8}}/>
        )
      }
    </View>
  );
});



export default ProfilePhotosPreviewPage;
