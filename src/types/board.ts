import { Card } from "./card";

export interface Board {
  id: number;
  title: string;
  cards: Card[];
}
