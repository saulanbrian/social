import { ThemedView, ThemedText } from '../../components/ui'

import { useAuthContext } from  '../../context/authentication'
import { useUserStore } from '../../stores/user'

import { Image } from 'expo-image'

const Profile = () => {
  
  const { username, profileURL } = useUserStore()
  const { logout } = useAuthContext()
  
  return (
    <ThemedView style={{flex:1}}>
      <ThemedText onPress={logout}>hi { username }</ThemedText>
      <Image 
        style={{height:200,width:200}}
        source={profileURL}
        priority='high'
        cachePolicy='memory-disk'
        />
    </ThemedView>
  );
};

export default Profile;