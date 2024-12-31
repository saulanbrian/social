import React, { Suspense, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeInDown, useAnimatedScrollHandler } from "react-native-reanimated";
import { PostCard } from "@/components";
import { ThemedActivityIndicator } from "@/components/ui";

import { useGetInfiniteUserPosts } from "@/api/queries/post";
import { useUserStore } from "@/stores/user";
import { summarizeQueryPagesResult } from "@/utils/queries";
import { useProfileLayoutContext } from "@/context/profile-layouts";
import { Post } from "@/types/post";

export const ProfilePostsPage = () => {
  const { id } = useUserStore();

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <Posts userId={id as string} />
    </Suspense>
  );
};

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<Post>);

const Posts = React.memo(({ userId }: { userId: string }) => {
  const { childrenScrollHandler } = useProfileLayoutContext();
  const { data, fetchNextPage } = useGetInfiniteUserPosts(userId);
  const posts = useMemo(() => data, [data]);

  return (
    <AnimatedFlashList
      data={summarizeQueryPagesResult(posts)}
      keyExtractor={(item) => item.id}
      renderItem={({ item: post }) => (
        <Animated.View entering={FadeInDown}>
          <PostCard post={post} />
        </Animated.View>
      )}
      estimatedItemSize={200}
      onEndReached={fetchNextPage}
      onScroll={childrenScrollHandler}
      snapToAlignment={'center'}
      decelerationRate={0.0001}
      ItemSeparatorComponent={() => <View style={{height:2}} />}
      contentContainerStyle={{paddingHorizontal:4}}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
});

export default ProfilePostsPage;
