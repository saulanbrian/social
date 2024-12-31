
import React from 'react'
import { ThemedActivityIndicator, ThemedView } from '../ui'
import { Dimensions } from 'react-native'

const AutoCenteredActivityIndicator = () => {

  return (
    <ThemedView style={{
      height:'100%',
      width:'100%',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <ThemedActivityIndicator />
    </ThemedView>
  )
}

export default AutoCenteredActivityIndicator