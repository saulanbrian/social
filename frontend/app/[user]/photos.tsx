import { useGetUserImages } from "@/api/queries/user"
import AnimatedImageList from "@/components/AnimatedImageList"
import { ThemedActivityIndicator } from "@/components/ui"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { useLocalSearchParams } from "expo-router"
import { Suspense } from "react"
import { Dimensions } from "react-native"

const UserPhotosPage = () => {
  const { user } = useLocalSearchParams()

  return (
    <Suspense fallback={<ThemedActivityIndicator />}>
      <UserPhotos userId={user as string}/>
    </Suspense>
  )
}

const UserPhotos = ({ userId }: { userId: string }) => {

  const { data:images } = useGetUserImages(userId)
  const { width } = Dimensions.get('window')

  return (
    <AnimatedImageList 
      images={summarizeQueryPagesResult(images)} 
      estimatedItemSize={200}
      imageProps={
        { 
          style: {
            height:200, 
            width:width / 2
          }
        }
      } />
  )
}
 
export default UserPhotosPage