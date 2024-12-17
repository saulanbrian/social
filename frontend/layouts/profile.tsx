import { Slot, Tabs } from "expo-router"
import { ThemedView, ThemedText, Avatar, ThemedActivityIndicator } from '@/components/ui'

import { useUserStore } from '@/stores/user'

import { Text, StyleSheet} from 'react-native'

import { useThemeContext } from "@/context/theme"
import User from "@/types/user"
import { Suspense } from "react"
import { useGetUser } from "@/api/queries/user"


type Props = {
  tabs:{ tabName: string, tabLabel: string}[];
  tabBarWith:number;
  user:User,
  children?:React.ReactNode
}


const ProfileLayout = ({ tabs, tabBarWith, user, children }: Props) => {

  const { theme } = useThemeContext()
  
  return (
    <ThemedView style={{flex:1, position:'relative'}}>

      <ProfileHeader { ...user } />

      { children }

      <ThemedView style={{marginBottom:24,marginTop:0}}/>
      <Tabs 
        sceneContainerStyle={{
          paddingTop:36,
          backgroundColor:theme.colors.background.default
        }}
        screenOptions={{
        headerShown:false,
        tabBarStyle:{
          position:'absolute',
          top:-24,
          alignItems:'center',
          marginRight:'auto',
          backgroundColor:'transparent',
          shadowOpacity:0,
          elevation:0,
          padding:0,
          width:tabBarWith
        },
        tabBarIcon: () => null,
        tabBarLabelStyle:{
          fontSize:12,
        },
        tabBarActiveTintColor:theme.colors.tint,
      }}>
        { tabs?.map(({ tabLabel, tabName }) => (
          <Tabs.Screen name={tabName} key={tabLabel} options={{ 
            tabBarLabel:({focused}) => (
              <Text style={{ 
                backgroundColor: focused?  theme.colors.tint: theme.colors.background.card,
                color:focused? theme.colors.tabBarIcon: theme.colors.text,
                padding:16,
                borderRadius:8,
              }}> 
                { tabLabel }
              </Text>
            )
          }} />
        ) )}
      </Tabs>
    </ThemedView>
  )
}


const ProfileHeader = ({ id, profile_picture, username}: User) => {
  return (
    <ThemedView style={styles.container}>
      <Avatar 
        size={200}
        style={styles.imageContainer}
        source={profile_picture}
        shape='square'
        imageProps={{
          priority:'high',
          cachePolicy:'memory-disk',
        }}
        />
      <ThemedText style={styles.username}>{ username }</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 8,
  },
  imageContainer:{
    
  },
  username:{
    textAlign:'left',
    marginTop:4,
    fontSize:20,
    fontWeight:600,
  }
})

export default ProfileLayout;  