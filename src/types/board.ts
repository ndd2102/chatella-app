import { ICard } from "./card";

export interface IBoard {
  id: number;
  title: string;
  cards: ICard[];
}
