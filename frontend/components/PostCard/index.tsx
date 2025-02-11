import CompoundPostCard from "../CompoundPostCard"
import { Post } from "@/types/post"


export default function PostCard({ post }: { post: Post }){

  return (
    <CompoundPostCard post={post} style={{ paddingVertical: 8 }}>
      <CompoundPostCard.Header />
      <CompoundPostCard.Image imageStyle={{ borderRadius: 4 }}/>
      <CompoundPostCard.Caption />
      <CompoundPostCard.Actions />
    </CompoundPostCard>
  )
}

