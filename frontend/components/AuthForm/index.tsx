import React, { 
  useState, 
  forwardRef, 
  Ref, 
  useImperativeHandle
} from 'react'

import { 
  StyleSheet, 
  TouchableOpacity,
  Appearance, 
  useColorScheme,
  ViewProps,
  View as RegularView
} from 'react-native'

import { 
  CustomView as View, 
  CustomTO,
  CustomTextInput as TextInput,
  CustomText as Text,
  InputError,
  ActivityIndicator
} from '../ui'

import { Link, LinkProps } from 'expo-router'

import ChangeMethodLink from './changeMethodLink'

import { Colors } from '../../constants/Colors'

import { 
  FormErrorType, 
  destructureFormErrorByKey
} from '../../utils/errors'


export type AuthFormRef = {
  username:string;
  password:string;
  passwordConfirm? : string
}

type AuthFormProps = ViewProps & {
  method:'login' | 'signup';
  error:FormErrorType;
  onSubmit:() => void;
  isPending:boolean
}

function AuthForm(props:AuthFormProps,ref:Ref<AuthFormRef | null>){
  
  const {
    method, 
    style,
    onSubmit,
    error,
    isPending,
    ...restProps
  } = props;
  
  
  const [username,setUsername] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [passwordConfirm,setPasswordConfirm] = useState<string>('')
  
  const theme = useColorScheme()
  const buttonTextColor = theme === 'light'? Colors.dark.text: Colors.light.text
  
  const {
    detail: detailErrors,
    username:usernameErrors,
    password:passwordErrors
  } = destructureFormErrorByKey({ 
    error, 
    keys:['detail','username','password'] 
  })
  
  
  useImperativeHandle(ref, () => {
    return method === 'login'? {
      username, 
      password,
    }: { username, password, passwordConfirm }
  })
  
  const buttonDisabled = method === 'login'? (
    Boolean(!username || !password) ):
    Boolean(!username || !password || !passwordConfirm)
  
  return (
    <View style={{...styles.container,...style}} {...restProps}>
      <TextInput 
        value={username}
        onChangeText={setUsername}
        placeholder='username' 
        style={styles.formInput}
        />
        
      { usernameErrors && usernameErrors.length >= 1 && (
        <InputError 
          style={{marginStart:26}}
          message={usernameErrors[0]} />
      ) }
      
      <TextInput 
        value={password}
        onChangeText={setPassword}
        placeholder='password'
        style={styles.formInput}
        secureTextEntry/>
      
      { passwordErrors && passwordErrors.length >= 1 && (
        <InputError 
          style={{marginStart:26}}
          message={passwordErrors[0]} />
      ) }
      
      { method === 'signup' && (
        <TextInput
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          placeholder='re-enter your password' 
          style={styles.formInput}
          secureTextEntry/>
      ) }
      
      { method === 'signup' && passwordErrors && passwordErrors.length >= 1 && (
        <InputError 
          style={{marginStart:26}}
          message={passwordErrors[0]} />
      ) }
      
      <ChangeMethodLink method={method} style={{marginStart:22}} />
      
      { detailErrors && detailErrors.length >= 1 && (
        <InputError 
          style={{marginStart:26}}
          message={detailErrors[0]} />
      ) }
      
      <CustomTO 
        style={styles.button} 
        onPress={onSubmit} 
        disabled={isPending? true: buttonDisabled}>
        { !isPending? (
          <Text style={[styles.buttonText,{color:buttonTextColor}]}>
            { method }
          </Text>
        ): (
          <RegularView style={{margin:8}}>
            <ActivityIndicator /> 
          </RegularView>
        ) }
      </CustomTO>
      
    </View>
  )
}

export default forwardRef(AuthForm)

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
  disabledButton:{
    opacity:0
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