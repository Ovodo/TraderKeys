import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Search = {
  text: string;
};

const initialState = {
  text: "",
} as Search;

export const section = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { setText } = section.actions;
export default section.reducer;
