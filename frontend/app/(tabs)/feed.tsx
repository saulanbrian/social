import { useEffect, useMemo } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { useThemeContext } from '../../context/theme'
import { ThemedView, ThemedText } from '../../components/ui'
import { FlashList } from '@shopify/flash-list'
import Post from '../../components/Post'
import { Pressable, View } from 'react-native'

import { useGetPosts } from '../../api/queries/post'


const Feed = () => {
  
  const { fetchNextPage, hasNextPage, data } = useGetPosts()
  const { width, height } = Dimensions.get('window')
  const { theme } = useThemeContext()
    
  const posts = useMemo(() => {
    const res = []
    if(!!data){
      for(let page of data.pages){
        res.push(...page.results)
      }
    }
    return res
  },[data])
  
  


  return (
    <ThemedView style={{flex:1, width:width}}>
      <FlashList
        data={posts}
        keyExtractor={(post) => post.id}
        onEndReached={fetchNextPage}
        estimatedItemSize={500}
        pullToRefresh
        contentContainerStyle={{
          
        }}
        renderItem={({item}) => {
          return <Post {...item} style={styles.post} />
        }}
        ItemSeparatorComponent={() => (
          <View style={{height:1,backgroundColor:theme.colors.background.card,margin:1}} />
        )}
      />
    </ThemedView>
  );
};


const styles = StyleSheet.create({
  post:{
    position:'relative',
    marginVertical:2
  }
})

export default Feed;