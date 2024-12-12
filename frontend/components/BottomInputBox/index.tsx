import { Avatar, ThemedView, TouchableIcon, FlatInput } from '../ui'
import { StyleSheet, ViewProps } from 'react-native'

import { forwardRef, useState, useImperativeHandle, useCallback } from 'react'
import { useThemeContext } from '../../context/theme'
import { useUserStore } from '../../stores/user'

export type BottomInputBoxRef = {
  text:string | null;
  clearInput:() => void;
}

type Props = ViewProps & {
  placeholder:string;
  handleSend:() => void;
}

const BottomInputBox = forwardRef<BottomInputBoxRef,Props>(({
  placeholder,
  handleSend,
  style,
  ...props
},ref) => {
  
  const { theme } = useThemeContext()
  const { profileURL } = useUserStore()
  const [text,setText] = useState<string | null>(null)
  
  useImperativeHandle(ref, () => ({
    text,
    clearInput,
  }))
  
  const clearInput = useCallback(() => {
    setText(null)
  },[])
  
  return (
    <ThemedView style={[styles.commentBoxContainer,style]} {...props} >
      <TouchableIcon 
        name={'folder-open'} 
        color={theme.colors.tint}
        size={28}/>
      <Avatar source={profileURL} size={36} />
      <FlatInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder} 
        style={
          [
            styles.commentInput,
            { opacity: !text? 0.7: 1}
          ]
        }/>
      <TouchableIcon 
        name={'send'} 
        color={theme.colors.tint}
        size={24}
        onPress={handleSend}/>
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  commentBoxContainer:{
    padding:12,
    position:'absolute',
    bottom:0,
    flex:1,
    flexDirection:'row',
    width:'100%',
    gap:8,
    alignItems:'center',
    height:70
  },
  commentInput:{
    padding:12,
    fontSize:16,
    flex:1,
    overflow:'hidden'
  },
})


export default BottomInputBox;