import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalState: false,
    modalCommentState:false,
    navBarState:false,
  },
  reducers: {
    change: (state) => {
      state.modalState = !state.modalState;
    },
    modalComment: (state) => {
      state.modalCommentState = !state.modalCommentState;
    },
    navBar: (state) => {
      state.navBarState = !state.navBarState;
    },
  },
});

export const { change, modalComment, navBar } = modalSlice.actions

export default modalSlice.reducer