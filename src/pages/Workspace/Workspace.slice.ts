import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../types/board";
import { Channel } from "../../types/channel";

export interface WorkspaceState {
  channelList: Channel[];
}

const initialState: WorkspaceState = {
  channelList: JSON.parse(localStorage.getItem("channelList") || "[]"),
};

const slice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    initializeWorkspace: () => initialState,
    loadChannelList: (
      state,
      { payload: channelList }: PayloadAction<Channel[]>
    ) => {
      state.channelList = channelList;
      localStorage.setItem("channelList", JSON.stringify(state.channelList));
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
      localStorage.setItem("channelList", JSON.stringify(state.channelList));
    },
  },
});

export const { initializeWorkspace, loadChannelList, updateBoards } =
  slice.actions;

export default slice.reducer;
