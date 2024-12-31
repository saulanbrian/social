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
import { View } from "react-native";

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
      snapToAlignment={'center'}
      decelerationRate={0.0001}
      ItemSeparatorComponent={() => <View style={{height:2}} />}
      contentContainerStyle={{paddingHorizontal:4}}
    />
  );
};

export default UserPostsPage;
