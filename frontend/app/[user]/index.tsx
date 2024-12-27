import { Suspense } from "react";
import { PostCard } from "@/components";
import { ThemedActivityIndicator } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";

import { useLocalSearchParams } from "expo-router";
import { useGetInfiniteUserPosts } from "@/api/queries/post";
import { useProfileLayoutContext } from "@/context/profile-layouts";
import { summarizeQueryPagesResult } from "@/utils/queries";
import { Post } from "@/types/post";

import Animated, { FadeInDown } from "react-native-reanimated";

const UserPostsPage = () => {
  const { user } = useLocalSearchParams();

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <Posts userId={user as string} />
    </Suspense>
  );
};

const RanimatedPostFlashList = Animated.createAnimatedComponent(FlashList<Post>);

const Posts = ({ userId }: { userId: string }) => {
  const { data: posts } = useGetInfiniteUserPosts(userId);
  const { childrenScrollHandler } = useProfileLayoutContext();

  return (
    <RanimatedPostFlashList
      data={summarizeQueryPagesResult(posts)}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Animated.View entering={FadeInDown}>
          <PostCard post={item} />
        </Animated.View>
      )}
      onScroll={childrenScrollHandler}
      estimatedItemSize={200}
    />
  );
};

export default UserPostsPage;
