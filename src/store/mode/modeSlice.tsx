import { createSlice } from "@reduxjs/toolkit";

type IInitialState = {
  mode: "Пользовательский" | "Предустановленный";
};

const initialState: IInitialState = {
  mode: "Предустановленный",
};

const modalSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setStatus: (state) => {
      if (state.mode === "Пользовательский") {
        state.mode = "Предустановленный";
      } else {
        state.mode = "Пользовательский";
      }
    },
  },
});

export const {setStatus} = modalSlice.actions;
export default modalSlice.reducer;
