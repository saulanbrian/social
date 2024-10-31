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
  View 
} from 'react-native'

import { 
  ThemedActivityIndicator,
  ThemedView,
  ThemedTextInput,
  ThemedText,
  InputError
} from '../ui'

import { Link, LinkProps } from 'expo-router'

import ChangeMethodLink from './changeMethodLink'

import { Colors } from '../../constants/Colors'

import { 
  FormErrorType, 
  destructureFormErrorByKey
} from '../../utils/errors'
import { useThemeContext } from '@/context/theme'


export type AuthFormRef = {
  username:string;
  password:string;
  passwordConfirm? : string
}

type AuthFormProps = ViewProps & {
  method:'login' | 'signup';
  onSubmit:() => void;
  error: FormErrorType | null;
  isPending:boolean
}

function AuthForm(props:AuthFormProps,ref:Ref<AuthFormRef>){
  
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
  
  const { theme } = useThemeContext()
  
  const {
    detail: detailErrors,
    username:usernameErrors,
    password:passwordErrors
  } = error !== null? destructureFormErrorByKey({ error ,keys:['detail','username','password'] }): {}
  
  
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
    <ThemedView style={[{...styles.container},style]} {...restProps}>
      <ThemedTextInput 
        value={username}
        onChangeText={setUsername}
        placeholder='username' 
        style={styles.formInput}
        />
        
      { usernameErrors && usernameErrors.length >= 1 && (
        <InputError style={{marginStart:26}} message={usernameErrors[0]} />
      ) }
      
      <ThemedTextInput 
        value={password}
        onChangeText={setPassword}
        placeholder='password'
        style={styles.formInput}
        secureTextEntry/>
      
      { passwordErrors && passwordErrors.length >= 1 && (
        <InputError style={{marginStart:26}} message={passwordErrors[0]} />
      ) }
      
      { method === 'signup' && (
        <ThemedTextInput
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          placeholder='re-enter your password' 
          style={styles.formInput}
          secureTextEntry/>
      ) }
      
      { method === 'signup' && passwordErrors && passwordErrors.length >= 1 && (
        <InputError style={{marginStart:26}} message={passwordErrors[0]} />
      ) }
      
      <ChangeMethodLink method={method} style={{marginStart:22}} />
      
      { detailErrors && detailErrors.length >= 1 && (
        <InputError style={{marginStart:26}} message={detailErrors[0]} />
      ) }
      
      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={isPending? true: buttonDisabled}>
        { !isPending? (
          <ThemedText style={
            [
              styles.buttonText,
              {
                backgroundColor:theme.colors.secondary,
                opacity: isPending || buttonDisabled? 0.5 : 1
              }
            ]
          }>
            { method }
          </ThemedText>
        ): (
          <View style={{margin:8}}>
            <ThemedActivityIndicator /> 
          </View>
        ) }
      </TouchableOpacity>
      
    </ThemedView>
  )
}

export default forwardRef(AuthForm)

const styles = StyleSheet.create({
  button:{
    position:'absolute',
    bottom:0,
    width:'100%',
  },
  buttonText: {
    textTransform: 'uppercase',
    fontSize:28,
    fontWeight: '400',
    flex:1,
    width:'100%',
    padding:16,
    textAlign:'center'
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