import { PostImageListPreview } from "@/components";

import React, { Suspense } from "react";
import { useGetUserImages } from "@/api/queries/user";
import { ThemedActivityIndicator } from "@/components/ui";
import { useUserStore } from "@/stores/user";
import { summarizeQueryPagesResult } from "@/utils/queries";
import { Href, usePathname, useRouter } from "expo-router";

const ProfilePhotosPreviewPage = () => {
  const { id } = useUserStore();

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <UserImagesPreview userId={id as string} />
    </Suspense>
  );
};

const UserImagesPreview = React.memo(({ userId }: { userId: string }) => {

  const router = useRouter()
  const pathname = usePathname()
  const { data } = useGetUserImages(userId);

  return (
    <PostImageListPreview
      images={summarizeQueryPagesResult(data)}
      moreImagesCount={data.pages[0].count - 3}
      onClickForMore={() => router.navigate({
        pathname:'/images/user/[id]',
        params: { 
          id:userId
        }
      })}
    />
  );
});

export default ProfilePhotosPreviewPage;
