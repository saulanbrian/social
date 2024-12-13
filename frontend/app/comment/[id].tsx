import { ThemedView, ThemedText , ThemedActivityIndicator } from '../../components/ui'
import { Comment as CommentComponent } from '../../components'

import React, { useEffect, Suspense } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useGetComment } from '../../api/queries/comments'

const CommentPage = () => {
  
  const { id } = useLocalSearchParams()
  
  return (
    <ThemedView style={{flex:1}}>
      <Suspense fallback={<ThemedActivityIndicator />} >
        <Comment id={id as string } />
      </Suspense>
    </ThemedView>
  )
}

const Comment = ({ id }: { id:string }) => {
  const { data: comment } = useGetComment(id)
  
  return <CommentComponent {...comment} />
}

export default CommentPage;