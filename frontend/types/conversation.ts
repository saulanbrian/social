import { Chat } from "./chat";
import User from "./user";


export type Conversation = {
  id:string;
  participants:string[];
  last_message: Chat | null;
  other_end:User;
}