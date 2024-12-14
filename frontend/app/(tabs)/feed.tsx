import { Suspense, useEffect, useMemo, useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { useThemeContext } from '../../context/theme'
import { ThemedView, ThemedText, ThemedActivityIndicator } from '../../components/ui'
import { FlashList } from '@shopify/flash-list'
import PostCard from '../../components/PostCard'
import { Pressable, View } from 'react-native'

import { useGetPosts } from '../../api/queries/post'
import { summarizeQueryPagesResult } from '../../utils/queries'


const Feed = () => {
  
  return (
    <ThemedView style={{flex:1}}>
      <Suspense fallback={<ThemedActivityIndicator />}>
        <PostList />
      </Suspense>
    </ThemedView>
  );
};


const PostList = () => {

  const { data:posts } = useGetPosts()
  const router = useRouter()

  const handlePress = (id:string) => {
    router.navigate(`/post/${id}`)
  }

  return (
    <FlashList 
      data={summarizeQueryPagesResult(posts)}
      keyExtractor={(post) => post.id}
      renderItem={({ item: post}) => (
        <Pressable 
          onPress={() => handlePress(post.id)} 
          style={{flex:1}}>
          <PostCard post={post}/>
        </Pressable>
      )}
      ItemSeparatorComponent={() => <ThemedView style={styles.separator} /> }
      estimatedItemSize={400}
    />
  )
}


const styles = StyleSheet.create({
  post:{
    position:'relative',
  },
  separator:{
    height:2
  }
})

export default Feed;