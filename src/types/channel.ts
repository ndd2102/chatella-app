export interface Channel {
  id: number;
  members: ChannelMembers[];
}

export interface ChannelMembers {
  userId: number;
  role: string;
}
