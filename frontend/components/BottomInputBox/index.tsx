import { Avatar, ThemedView, TouchableIcon, FlatInput } from '@/components/ui'
import { StyleSheet, ViewProps } from 'react-native'

import { forwardRef, useState, useImperativeHandle, useCallback } from 'react'
import { useThemeContext } from '@/context/theme'
import { useGetCurrentUser } from '@/api/queries/user'

export type BottomInputBoxRef = {
  text:string | undefined;
  clearInput:() => void;
}

type Props = ViewProps & {
  placeholder:string;
  handleSend:(text:string | undefined ) => void;
}

const BottomInputBox = forwardRef<BottomInputBoxRef,Props>(({
  placeholder,
  handleSend,
  style,
  ...props
},ref) => {
  
  const { theme } = useThemeContext()
  const { data: user } = useGetCurrentUser()
  const [text,setText] = useState<string | undefined>(undefined)
  
  useImperativeHandle(ref, () => ({
    text,
    clearInput,
  }))
  
  const clearInput = () => {
    setText(undefined)
  }
  
  return (
    <ThemedView style={[styles.commentBoxContainer,style]} {...props} >
      <TouchableIcon 
        name={'folder-open'} 
        color={theme.colors.tint}
        size={28}/>
      <Avatar source={user?.profile_picture as string} size={36} />
      <FlatInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder} 
        multiline
        numberOfLines={20}
        style={styles.commentInput}/>
      <TouchableIcon 
        name={'send'} 
        color={theme.colors.tint}
        size={24}
        onPress={() => handleSend(text)}/>
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  commentBoxContainer:{
    padding:12,
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    width:'100%',
    gap:8,
    alignItems:'center',
    minHeight:70,
    left:0,
    right:0
  },
  commentInput:{
    padding:12,
    fontSize:16,
    flex:1,
  },
})


export default BottomInputBox;