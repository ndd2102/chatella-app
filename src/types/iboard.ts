import { ICard } from "./icard";

export interface IBoard {
  id: number;
  title: string;
  cards: ICard[];
}
