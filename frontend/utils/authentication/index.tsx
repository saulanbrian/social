import * as SecureStore from 'expo-secure-store'

export const getRefreshToken = async() => {
  const token = await SecureStore.getItemAsync('refresh')
  return token
}