export type Post = {
  id: string;
  caption: string | null;
  image: string | null;
  author_profile: string;
  author_username:string;
  is_liked?:boolean;
  author_id:string
}

export type PostImage = {
  image: string;
  post_id:string;
}

export type PostMutationArgs = {
  id: string;
  authorId: string
}