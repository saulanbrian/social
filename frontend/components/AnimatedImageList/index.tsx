import { PostImage } from '@/types/post'
import { AnimatedFlashList, FlashListProps } from '@shopify/flash-list'
import { Image, ImageProps } from 'expo-image'
import React from 'react'
import Animated, { FadeInDown, FadeInUp, ZoomIn, ZoomInEasyDown, ZoomInEasyUp, ZoomInRotate } from 'react-native-reanimated'


type AnimatedImageListProps = Omit<FlashListProps<PostImage>,'data' | 'renderItem'> & {
  images: PostImage[],
  imageProps?: ImageProps;
}

const AnimatedImageList = ({ images, imageProps, ...props }: AnimatedImageListProps) => {

  return (
    <AnimatedFlashList
      data={images}
      keyExtractor={(item) => item.post_id}
      renderItem={({ item, index }) => (
        <Animated.View entering={ZoomIn}>
          <Image 
            source={{ uri: item.image }} 
            style={{ width: 200, height: 200}}
            {...imageProps} />
        </Animated.View>
      ) }
      estimatedItemSize={200}
      numColumns={2}
      { ...props }
     />
  )
}

export default AnimatedImageList;