import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../types/board";
import { Channel } from "../../types/channel";

export interface WorkspaceState {
  channelList: Channel[];
}

const initialState: WorkspaceState = {
  channelList: [],
};

const slice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    loadChannelList: (
      state,
      { payload: channelList }: PayloadAction<Channel[]>
    ) => {
      state.channelList = channelList;
    },
    updateBoards: (
      state,
      {
        payload: { boards, idChannel },
      }: PayloadAction<{ boards: Board[]; idChannel: number }>
    ) => {
      const findIndexChannel = state.channelList.findIndex(
        (channel) => channel.id === idChannel
      );
      state.channelList[findIndexChannel].boards = boards;
    },
  },
});

export const { loadChannelList, updateBoards } = slice.actions;

export default slice.reducer;
