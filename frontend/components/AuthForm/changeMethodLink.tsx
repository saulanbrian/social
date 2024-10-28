import { ViewProps, TouchableOpacity, View } from 'react-native' 
import { Link } from 'expo-router'
import { CustomText as Text } from '../ui'

type MethodLinkProps = ViewProps & {
  method:string;
}

function ChangeMethodLink({method,style,...props}:MethodLinkProps) {
  
  const redirectPath = method === 'login'? '/authentication/signup': '/authentication/login'
  const text = method === 'login'? 'dont have an account? click here to signup': 'already have an account? login.'
  
  return (
    <View style={style}>
      <Link replace asChild href={redirectPath}>
        <TouchableOpacity>
          <Text> { text } </Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}


export default ChangeMethodLink