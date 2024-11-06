import Card from '../Card'
import { ThemedText } from '../ui'

export type PostProps = {
  author:string,
  author_profile_url:string,
  content:string,
  image?:string
}

const Post = () => {
  return (
    <Card style={{margin:4,padding:50}}>
      <ThemedText>hsh</ThemedText>
    </Card>
  )
}


export default Post;