import { Avatar, FlatInput, ThemedActivityIndicator, ThemedText, ThemedView } from "@/components/ui"
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native"
import { Image } from "expo-image"

import useImagePicker from "@/hooks/image-picker"
import { useUserStore } from "@/stores/user"
import React,{ forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import * as ImagePicker from 'expo-image-picker'
import { useThemeContext } from "@/context/theme"
import { Entypo } from "@expo/vector-icons"
import { useCreatePost } from "@/api/interactions/post"
import { useRouter } from "expo-router"

const PostCreationPage = () => {

  const router = useRouter()
  const captionRef = useRef<CaptionInputRef | null>(null)
  const imageRef = useRef<ImageInputRef | null>(null)
  const { mutate, isSuccess, isPending} = useCreatePost()

  const submitForm = () => {
    if(!!captionRef.current?.text || !!imageRef.current?.image){
      const formData = new FormData()

      if(captionRef.current?.text){
        formData.append('caption',captionRef.current.text as string)
      }
       
      if(imageRef.current?.image){

        const { uri, fileName } = imageRef.current.image as ImagePicker.ImagePickerAsset
        const fileExtension = fileName?.split('.').pop()
        
        formData.append('image',{
          uri:uri,
          type:`image/${fileExtension}`,
          name:fileName
        } as any as Blob)

      }

      mutate(formData)
    }
    
  }

  useEffect(() => {
    if(isSuccess){
      router.canGoBack()? router.back(): router.navigate('/feed')
    }
  },[isSuccess])

  return (
    <ThemedView style={styles.container}>
      <Header />
      <CaptionInput ref={captionRef} />
      <ImageInput ref={imageRef}/>
      <SubmitButton onPress={submitForm} isPending={isPending}/>
    </ThemedView>
  )
}


const Header = () => {

  const { profileURL,username } = useUserStore()

  return (
    <ThemedView style={styles.header}>
      <Avatar source={profileURL} size={48} />
      <ThemedText style={styles.headerUsername}>{ username }</ThemedText>
    </ThemedView>
  )
}


type CaptionInputRef = {
  text: string | undefined;
}

const CaptionInput = forwardRef<CaptionInputRef>((_,ref) => {
  
  const [text,setText] = useState<string | undefined>(undefined)

  useImperativeHandle(ref, () => ({ text }))

  return (
    <FlatInput
      value={text}
      onChangeText={setText}
      placeholder="write down your thoughts..."
      style={styles.textInput}
      multiline
      numberOfLines={20}
      />
  )
})


type ImageInputRef = {
  image:ImagePicker.ImagePickerAsset | null
}

const ImageInput = forwardRef<ImageInputRef>((_,ref) => {

  const { theme } = useThemeContext()
  const { requestImageAsync } = useImagePicker()
  const [image,setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)

  useImperativeHandle(ref, () => ({ image }) )

  const handlePress = async() => {

    if(image){
      setImage(null)
    }else{
      const assets = await requestImageAsync({ allowsEditing: true })
      if(assets){
        setImage(assets[0])
      }
    }
  }

  return (
    <React.Fragment>
      <TouchableOpacity 
        onPress={handlePress} 
        style={
          [
            styles.imageInputButton,
            {
              backgroundColor: image? theme.colors.background.default : theme.colors.primary,
              borderColor: theme.colors.primary
            }
          ]
        }
      >
        <Entypo 
          name={image? 'cross' :'attachment' } 
          size={16} 
          color={image? theme.colors.primary: theme.colors.tabBarIcon}/> 
        <ThemedText 
          style={{ 
            color:image? theme.colors.primary: theme.colors.tabBarIcon,
            fontSize:16
          }}>
          { image? 'remove image': 'attach image'}
        </ThemedText>
      </TouchableOpacity>
      <Image
        source={{uri:image? image.uri: undefined}}
        style={styles.image} />
    </React.Fragment>
  )
})


const SubmitButton = ({ onPress, isPending }: { onPress: () => void, isPending: boolean }) => {

  const { theme } = useThemeContext()

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={
        [
          {
            backgroundColor:theme.colors.tint
          },
          styles.submitButton
        ]
      }
    >
      { 
        isPending
        ? <ThemedActivityIndicator />
        : <ThemedText 
            style={
              [
                styles.submitButtonText,
                { 
                  color: theme.colors.tabBarIcon
                }
              ]
            }
          >
              POST
          </ThemedText>
      }

    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    position:'relative',
    padding:8,
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    gap:4,
    paddingBottom:8
  },
  headerUsername:{
    fontSize:20
  },
  image:{
    width:Dimensions.get('screen').width - 16,
    aspectRatio:1,
    objectFit:'contain',
    borderRadius:8
  },
  imageInputButton:{
    maxWidth:140,
    borderRadius:4,
    padding:8,
    marginVertical:8,
    gap:4,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1
  },
  submitButton:{
    position:'absolute',
    bottom:0,
    width:Dimensions.get('screen').width,
    padding:24,
    flex:1,
    justifyContent:'center'
  },
  submitButtonText:{
    textAlign:'center',
    fontSize:20,
    fontWeight:600,
    letterSpacing:2
  },
  textInput:{
    padding:12,
    fontSize:16,
    textAlignVertical:'top',
    minHeight:100
  }
})

export default PostCreationPage