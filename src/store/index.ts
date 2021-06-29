import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "./modal/modalSlice";
import modeSlice from "./mode/modeSlice"

const store = configureStore({
  reducer: {
    modal: modalSlice,
    mode: modeSlice
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
