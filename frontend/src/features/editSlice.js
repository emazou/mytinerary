import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "edit",
  initialState: {id:""},
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setId } = editSlice.actions

export default editSlice.reducer