import { Board } from "./board";
export interface Channel {
  id: number;
  members: ChannelMember[];
  avatar: string;
  name: string;
  boards: Board[];
}

export interface ChannelMember {
  userId: number;
  role: string;
}
