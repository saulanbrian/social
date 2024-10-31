import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useAuthContext } from '../../context/authentication'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText, ThemedView } from '@/components/ui'
import { useThemeContext } from '@/context/theme'

const HomePage = () => {

  const { theme } = useThemeContext()
  
  return (
    <ThemedView style={{flex:1}}>
      <ThemedView style={[styles.card,{ borderColor: theme.colors.secondary }]}>
        <ThemedText>
          hello card
        </ThemedText>
      </ThemedView>
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  card:{
    alignSelf:'center',
    padding:8,
    borderWidth:2
  }
})

export default HomePage;