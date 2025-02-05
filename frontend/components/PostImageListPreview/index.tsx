import { ThemedView, ThemedText } from '../ui'
import { Text, StyleSheet, Dimensions, View, TouchableOpacity, Pressable, LayoutChangeEvent, ViewStyle } from 'react-native'
import { Image } from 'expo-image'

import React, { useEffect, useState } from 'react'
import { PostImage } from '@/types/post'


const BoxSize = Dimensions.get('window').width / 2

type PostImagelistPreviewProps = {
  images: PostImage[],
  moreImagesCount: number,
  onClickForMore?: () => void,
  style?:ViewStyle
}

const PostImageListPreview = ({ 
  images,
  moreImagesCount,
  onClickForMore,
  style
}: PostImagelistPreviewProps ) => {

  const [containerHeight,setContainerHeight] = useState(0)
  const [containerWidth,setContainerWidth] = useState(0)
  const imageHeight = containerHeight / 2
  const imageWidth = containerWidth / 2
  const hasAtleatFourPictures = images.length >= 4

  const handleLayout = (e:LayoutChangeEvent) => {
    setContainerHeight(e.nativeEvent.layout.height)
    setContainerWidth(e.nativeEvent.layout.width)
  }

  return (
      <ThemedView style={[styles.container,style]} onLayout={handleLayout}>
        { images.map((item,index) => {
          return index <= 3 && (
            <Image 
              key={item.post_id} 
              source={{ uri: item.image}} 
              style={{ height: imageHeight,width:imageWidth}} 
              cachePolicy={'memory-disk'}/>
          )
        })}
        { hasAtleatFourPictures && (
          <Pressable 
            style={({ pressed }) => ({
              ...styles.showMoreButton,
              opacity:pressed? 0.8: 0.6,
              height:imageHeight,
              width:imageWidth
            })}
            onPress={onClickForMore}
          >
            <ThemedText style={styles.showMoreButtonText}>+{ moreImagesCount }</ThemedText>
          </Pressable>
        )}
      </ThemedView>
    )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    flexWrap:'wrap',
    flex:1
  },
  image:{
    height:BoxSize,
    width: BoxSize
  },
  showMoreButton:{
    
    backgroundColor:'black',
    position:'absolute',
    bottom:0,
    right:0,
    justifyContent:'center'
  },
  showMoreButtonText:{
    fontSize:28,
    fontWeight:800,
    textAlign:'center',
    color:'white'
  }
})

export default PostImageListPreview