import { PostImageListPreview } from "@/components"
import { Suspense } from "react"
import { Dimensions, View } from "react-native"
import { ButtonLink, ThemedActivityIndicator } from "@/components/ui"

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

  const { data } = useGetUserImages(userId)
  const { headerHeight } = useProfileLayoutContext()

  const images = summarizeQueryPagesResult(data)

  return (
    <View style={{ paddingTop: headerHeight }}>
      <FlashList 
        data={images.slice(0,4)}
        keyExtractor={item => item.post_id}
        renderItem={({ item, index }) => (
          <Image 
            source={{ uri: item.image }}
            style={{ height: 200, width: 200}}/>
        )}
        horizontal
        estimatedItemSize={200}
        showsHorizontalScrollIndicator={false}
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
  )
}
 
export default UserPhotosPreviewPage