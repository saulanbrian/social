import { PostImageListPreview } from "@/components"
import { Suspense } from "react"
import { Dimensions } from "react-native"
import { ThemedActivityIndicator } from "@/components/ui"

import { useGetUserImages } from "@/api/queries/user"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { useLocalSearchParams, useRouter } from "expo-router"


const UserPhotosPreviewPage = () => {
  const { user } = useLocalSearchParams()

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <UserPhotos userId={user as string}/>
    </Suspense>
  )
}

const UserPhotos = ({ userId }: { userId: string }) => {

  const { data:images } = useGetUserImages(userId)
  const router = useRouter()

  return (
    <PostImageListPreview 
      images={summarizeQueryPagesResult(images)}
      moreImagesCount={images.pages[0].count - 3}
      onClickForMore={() => router.push({
        pathname:'/images/user/[id]',
        params:{ id: userId }
      })}
    />
  )
}
 
export default UserPhotosPreviewPage