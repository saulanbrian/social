import User from "./user";

export type Chat = {
  id: string;
  message: string;
  sender: User;
  is_read:boolean;
  timestamp: string
}