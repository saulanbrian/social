import { useGetUserImages } from "@/api/queries/user";
import AnimatedImageList from "@/components/AnimatedImageList";
import { ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import { useUserStore } from "@/stores/user";
import { summarizeQueryPagesResult } from "@/utils/queries";
import { AnimatedFlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Suspense, useRef } from "react";
import { Dimensions } from "react-native";

const ProfilePhotosPage = () => {

  const { id } = useUserStore()

  return (
    <Suspense fallback={<ThemedActivityIndicator />} >
      <UserPhotos userId={id as string} />
    </Suspense>
  )
}

const UserPhotos = ({ userId }: { userId: string }) => {

  const { data: photos } = useGetUserImages(userId)
  const { width } = Dimensions.get('screen')

  return (
    <AnimatedImageList 
      images={summarizeQueryPagesResult(photos)}
      imageProps={{
        style:{
          width: width / 2,
          height:200
        }
      }}
    />
  )
}

export default ProfilePhotosPage;