import { PostImageListPreview } from "@/components"
import { Suspense } from "react"
import { Dimensions, View } from "react-native"
import { ThemedActivityIndicator } from "@/components/ui"

import { useGetUserImages } from "@/api/queries/user"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useProfileLayoutContext } from "@/context/profile-layouts"
import { FlashList } from "@shopify/flash-list"
import { Image } from "expo-image"

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
  const { headerHeight } = useProfileLayoutContext()

  return (
    <View style={{ paddingTop: headerHeight }}>
      <FlashList 
        data={summarizeQueryPagesResult(images)}
        keyExtractor={item => item.post_id}
        renderItem={({ item }) => (
          <Image 
            source={{ uri: item.image }}
            style={{ height: 200, width: 200}}/>
        )}
        horizontal
        estimatedItemSize={200}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
 
export default UserPhotosPreviewPage