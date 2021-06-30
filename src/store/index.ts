import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "./modal/modalSlice";
import modeSlice from "./mode/modeSlice";
import cashedSlice from "./cashed/cashedSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    mode: modeSlice,
    cashed: cashedSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
