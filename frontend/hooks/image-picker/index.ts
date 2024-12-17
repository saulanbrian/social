import * as ImagePicker from 'expo-image-picker'


const useImagePicker = () => {

  const requestImageAsync = async(options?: ImagePicker.ImagePickerOptions):Promise<ImagePicker.ImagePickerAsset[] | null> => {
    const {assets, canceled } = await ImagePicker.launchImageLibraryAsync(options)

    if(canceled || assets.length < 1) {
      return null
    } else return assets

  }


  return {
    requestImageAsync
  }


}

export default useImagePicker