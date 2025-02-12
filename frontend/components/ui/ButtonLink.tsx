import { TouchableOpacity, ViewProps } from "react-native"
import ThemedText  from "./ThemedText"
import { Href, useRouter } from "expo-router"
import { useThemeContext } from "@/context/theme";


type ButtonLinkProps = ViewProps & {
  href:Href;
  text:string;
}


const ButtonLink = ({ href, text, ...props}: ButtonLinkProps ) => {

  const router = useRouter()
  const { theme } = useThemeContext()

  const handlePress = () => {
    router.push(href)
  }

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      <ThemedText style={{ color: theme.colors.tint }}>
        { text }
      </ThemedText>
    </TouchableOpacity>
  )
}

export default ButtonLink