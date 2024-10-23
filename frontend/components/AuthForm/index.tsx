import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity , Appearance, useColorScheme } from 'react-native'
import { 
  CustomView as View, 
  CustomButton as Button,
  CustomTextInput as TextInput,
  CustomText as Text
} from '../ui'
import { Colors } from '../../constants/Colors'

type SignupProps = {
  method:'signup',
  passwordConfirmRef:React.RefObject<TextInput | null>
}

type BaseAuthProps = {
  method:'login' | 'signup',   
  usernameRef:React.RefObject<TextInput | null>,
  passwordRef:React.RefObject<TextInput | null>,
  onSubmit:() => void,
}

type AuthFormProps = 
  | BaseAuthProps 
  | ( SignupProps & BaseAuthProps )


export default function AuthForm(props: AuthFormProps){
  
  const {
    method,
    usernameRef,
    passwordRef,
    onSubmit
  } = props;
  
  const theme = useColorScheme()
  const buttonTextColor = theme === 'light'? Colors.dark.text: Colors.light.text
  
  return (
    <View style={styles.container}>
      <TextInput 
        ref={usernameRef}
        placeholder='username' 
        style={styles.formInput}
        />
      <TextInput 
        ref={passwordRef}
        placeholder='password'
        style={styles.formInput}
        secureTextEntry/>
      
      { method === 'signup' && (
        <TextInput
          ref={(props as SignupProps).passwordConfirmRef}
          placeholder='re-enter your password' 
          style={styles.formInput}
          secureTextEntry/>
      ) }
    
      
      <Button style={styles.button} onPress={onSubmit}>
        <Text style={[styles.buttonText,{color:buttonTextColor}]}>{ method }</Text>
      </Button>
    </View>
  )
}


const styles = StyleSheet.create({
  button:{
    position:'absolute',
    bottom:0,
    width:'100%',
    padding:16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textTransform: 'uppercase',
    fontSize:28,
    fontWeight: '400',
  },
  container:{
    flex:1,
    position:'relative',
    rowGap:12,
    paddingTop:64
  },
  formInput:{
    alignSelf: 'center',
    width:'88%',
    borderWidth:1,
    borderRadius:8,
    padding:16,
    marginHorizontal: 8,
    fontSize:20
  }
})