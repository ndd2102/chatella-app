import { IBoard } from "../../types/iboard";
import { ApiMockResponse } from "../ApiMockData/dummyData";

const LocalStorageKeyName = "ok";
export class BoardAPI {
  async fetchBoardList(): Promise<IBoard[]> {
    const apiData: IBoard[] = ApiMockResponse;
    let BoardList: IBoard[] = [];
    //first check local storage if local storage is empty then add api mock data as seed
    if (localStorage.getItem(LocalStorageKeyName)) {
      const localStorageData: IBoard[] = JSON.parse(
        localStorage.getItem(LocalStorageKeyName) ?? ""
      );
      BoardList = [...localStorageData];
    } else {
      BoardList = [...apiData];
      updateLocalStorageBoards(BoardList);
    }
    return BoardList;
  }
}

export async function fetchBoardList(): Promise<IBoard[]> {
  const api = new BoardAPI();
  return api.fetchBoardList();
}

export function updateLocalStorageBoards(boards: IBoard[]) {
  localStorage.setItem(LocalStorageKeyName, JSON.stringify(boards));
}
