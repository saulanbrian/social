import { View, Text, ScrollView, Touchable, TouchableOpacity, LayoutChangeEvent } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { ThemedText, ThemedView } from '@/components/ui'
import { useFocusEffect } from '@react-navigation/native'
import { useProfileLayoutContext } from '@/context/tabBar'



const Index = () => {

  const [shits,setShits] = useState<string[]>([])
  const scrollRef = useRef<View | null>(null)

  useEffect(() => {
    if(scrollRef.current){(
      scrollRef.current.measureInWindow((x,y,width,height) => {
        console.log(height);
        
      }))
    }
  },[shits])

  return (
    <View ref={scrollRef}>
      <FlashList
      data={shits}
      keyExtractor={(item,i) => i.toString()}
      renderItem={({ item: shit }) => (
        <ThemedView style={{height:200}}>
          <ThemedText>{ shit }</ThemedText>
        </ThemedView>
      )}
      scrollEnabled
      ListFooterComponent={() => {
        return <TouchableOpacity onPress={() => setShits(prevShits => [...prevShits,'shit'])}>
          <ThemedText>add another shit</ThemedText>
        </TouchableOpacity>
      }}
      estimatedItemSize={200}
    />
    </View>
  ) 
}

export default Index
