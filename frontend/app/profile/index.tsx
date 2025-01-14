import React, { Suspense, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeInDown, useAnimatedScrollHandler } from "react-native-reanimated";
import { PostCard } from "@/components";
import { ThemedActivityIndicator } from "@/components/ui";

import { useGetInfiniteUserPosts } from "@/api/queries/post";
import { summarizeQueryPagesResult } from "@/utils/queries";
import { useProfileLayoutContext } from "@/context/profile-layouts";
import { Post } from "@/types/post";
import { useGetCurrentUser } from "@/api/queries/user";

export const ProfilePostsPage = () => {

  const { data: user} = useGetCurrentUser()

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <Posts userId={user?.id as string} />
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
      ItemSeparatorComponent={() => <View style={{height:1}} />}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
});

export default ProfilePostsPage;
