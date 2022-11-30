export interface Channel {
  id: number;
  members: ChannelMember[];
  avatar: string;
  name: string;
}

export interface ChannelMember {
  userId: number;
  role: string;
}
