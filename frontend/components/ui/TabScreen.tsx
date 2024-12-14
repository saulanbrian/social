import React from 'react'
import ThemedView from './ThemedView'
import { ViewProps } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const TabScreen = ({ style, ...props }: ViewProps) => {
 
  const tabBarHeigt = useBottomTabBarHeight()

  return <ThemedView style={[ style, { paddingBottom:tabBarHeigt }]} {...props}/>
}

export default TabScreen;