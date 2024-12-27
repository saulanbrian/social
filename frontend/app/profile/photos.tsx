import { PostImageListPreview } from "@/components";

import React, { Suspense } from "react";
import { useGetUserImages } from "@/api/queries/user";
import { ThemedActivityIndicator } from "@/components/ui";
import { useUserStore } from "@/stores/user";
import { summarizeQueryPagesResult } from "@/utils/queries";

const ProfilePhotosPage = () => {
  const { id } = useUserStore();

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <UserImagesPreview userId={id as string} />
    </Suspense>
  );
};

const UserImagesPreview = React.memo(({ userId }: { userId: string }) => {
  const { data } = useGetUserImages(userId);

  return (
    <PostImageListPreview
      images={summarizeQueryPagesResult(data)}
      moreImagesCount={data.pages[0].count - 3}
    />
  );
});

export default ProfilePhotosPage;
