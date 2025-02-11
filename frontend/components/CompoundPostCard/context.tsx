import { Post } from "@/types/post";
import React, { createContext, useContext } from "react";

type PostContextType = {
  post: Post
}

type PostContextProps = {
  children: React.ReactNode;
  post: Post
}

const PostContext = createContext<PostContextType | null>(null)

export const usePostContext = () => {
  const context = useContext(PostContext)
  if(!context) throw new Error('cannot use PostContext outside a PostContextProvider')
  return context
}

const PostContextProvider = ({ children, post }: PostContextProps ) => {

  return (
    <PostContext.Provider value={{ post }}>
      { children }
    </PostContext.Provider>
  )
}

export default PostContextProvider