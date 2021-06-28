import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "counter",
  initialState: {
    isOpen: false,
    searchText: "",
  },
  reducers: {
    setStatusModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSearchText: (state, action: PayloadAction<{ searchText: string }>) => {
      state.searchText = action.payload.searchText;
    },
  },
});

export const { setStatusModal, setSearchText } = modalSlice.actions;

export default modalSlice.reducer;
