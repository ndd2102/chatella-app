import { ChannelMember } from "./channel";
export interface Card {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  assignedTo: ChannelMember[];
}
