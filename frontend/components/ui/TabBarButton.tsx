import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import ThemedText from './ThemedText'
import { useThemeContext } from "@/context/theme";
import { act } from "react";

type TabBarButtonProps = {
  onPress:() => void;
  label:string;
  active:boolean;
  textStyle?:StyleProp<TextStyle>,
  style?:StyleProp<ViewStyle>
}

const TabBarButton = ({
  onPress,
  active,
  label,
  style,
  textStyle
}: TabBarButtonProps ) => {

  const { theme } = useThemeContext()

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={
        [
          {
            backgroundColor:active? theme.colors.tint: theme.colors.background.card
          },
          styles.tab,
          style
        ]
      }>
      <ThemedText 
        style={
          [
            { 
              color: active? theme.colors.tabBarIcon: theme.colors.text
            },
            styles.text,
            textStyle
          ]
        }>
        { label }
      </ThemedText>
    </TouchableOpacity>
  )
}

const styles = {
  tab:{
    padding:12,
    borderRadius:8
  },
  text:{
    fontSize:14
  }
}

export default TabBarButton