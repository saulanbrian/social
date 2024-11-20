import { useEffect, useMemo } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useThemeContext } from '../../context/theme'
import { ThemedView, ThemedText, ThemedActivityIndicator } from '../../components/ui'
import { FlashList } from '@shopify/flash-list'
import PostCard from '../../components/PostCard'
import { Pressable, View } from 'react-native'

import { useGetPosts } from '../../api/queries/post'
import { summarizeQueryPagesResult } from '../../utils/queries'


const Feed = () => {
  
  const { fetchNextPage, hasNextPage, data, status, isFetching} = useGetPosts()
  const { width, height } = Dimensions.get('window')
  const { theme } = useThemeContext()
  const router = useRouter()
  
  const posts = data? summarizeQueryPagesResult(data): undefined

  return (
    <ThemedView style={{flex:1, width:width}}>
      { posts? (
        <FlashList
          data={posts}
          keyExtractor={(post) => post.id}
          onEndReached={fetchNextPage}
          estimatedItemSize={500}
          contentContainerStyle={{
            
          }}
          renderItem={({ item: post }) => {
            return (
              <Pressable onPress={() => router.push(`/post/${post.id}`) } style={{flex:1}}>
                <PostCard post={post} imageShown={true}/>
              </Pressable>
            )
          }}
          ItemSeparatorComponent={() => {
            return <ThemedView style={styles.separator} />
          }}
        />
        ): isFetching? <ThemedActivityIndicator style={{alignSelf:'center',flex:1}}/>
        : status === 'error' && (
          <ThemedText>an error has occured</ThemedText>
        )
      }
    </ThemedView>
  );
};


const styles = StyleSheet.create({
  post:{
    position:'relative',
  },
  separator:{
    height:2
  }
})

export default Feed;