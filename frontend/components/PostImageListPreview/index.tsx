import { ThemedView, ThemedText } from '../ui'
import { Text, StyleSheet, Dimensions, View, TouchableOpacity, Pressable } from 'react-native'
import { Image } from 'expo-image'

import React from 'react'
import { PostImage } from '@/types/post'


const BoxSize = Dimensions.get('window').width / 2

type PostImagelistPreviewProps = {
  images: PostImage[],
  moreImagesCount: number,
  onClickForMore?: () => void
}

const PostImageListPreview = ({ 
  images,
  moreImagesCount,
  onClickForMore
}: PostImagelistPreviewProps ) => {

  const hasAtleatFourPictures = images.length >= 4

  return (
      <ThemedView style={styles.container}>
        { images.map((item,index) => {
          return index <= 3 && (
            <Image 
              key={item.post_id} 
              source={{ uri: item.image}} 
              style={styles.image} 
              cachePolicy={'memory-disk'}/>
          )
        })}
        { hasAtleatFourPictures && (
          <Pressable 
            style={({ pressed }) => ({
              ...styles.showMoreButton,
              opacity:pressed? 0.8: 0.6
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
    flexWrap:'wrap'
  },
  image:{
    height:BoxSize,
    width: BoxSize
  },
  showMoreButton:{
    height: BoxSize,
    width: BoxSize,
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