import { AutoCenteredActivityIndicator } from "@/components"
import { FlashList } from "@shopify/flash-list"
import { Image } from "expo-image"
import Animated, { FadeIn } from "react-native-reanimated"

import { useGetUser, useGetUserImages } from "@/api/queries/user"
import { useThemeContext } from "@/context/theme"
import { summarizeQueryPagesResult } from "@/utils/queries"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { Suspense, useEffect, useMemo } from "react"
import { Dimensions, StyleSheet, Text } from "react-native"


const UserImages = () => {

  const navigation = useNavigation()
  const { id } = useLocalSearchParams()
  const { data: user } = useGetUser(id as string)

  useEffect(() => {
    navigation.setOptions({
      headerTitle:`${user.username}'s photos`
    })
  },[user])

  return (
    <Suspense fallback={<AutoCenteredActivityIndicator/>}>
      <ImageList userId={id as string}/>
    </Suspense>
  )

}


  const ImageList = ({ userId }: { userId: string }) => {

    const { data, fetchNextPage } = useGetUserImages(userId)
    const { theme } = useThemeContext()
   
    return (
      <FlashList 
        data={summarizeQueryPagesResult(data)}
        keyExtractor={(item, index) => `${item.post_id}_${index}`}
        renderItem={({ item, index }) => {
          return (
            <Animated.View entering={ FadeIn }>
              <Image source={{ uri: item.image }} style={styles.image} />
            </Animated.View>
          )
        }}
        numColumns={2}
        estimatedItemSize={175}
        contentContainerStyle={{ backgroundColor: theme.colors.background.default}}
        onEndReached={fetchNextPage}
      />
    )
  }

const styles = StyleSheet.create({
  image:{
    height:Dimensions.get('window').width / 2,
    width:Dimensions.get('window').width / 2,
  }
})

export default UserImages