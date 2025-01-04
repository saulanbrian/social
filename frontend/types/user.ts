type User = {
  id: string;
  username: string;
  profile_picture?:string;
  bio?:string;
  followers:string[];
  following:string[];
  is_followed?:boolean;
  background_photo?:string
}

export default User