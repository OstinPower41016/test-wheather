import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {TCityWeather} from '../../components/Home/Card'

interface IInitialState {
  [key: string]: TCityWeather
}

const initialState: IInitialState = {}

const modalSlice = createSlice({
  name: "cashed",
  initialState,
  reducers: {
    setCashedCity: (state, action: PayloadAction<{city: string, dataCity: TCityWeather}>) => {
      const {city, dataCity} = action.payload;
      state[city] = dataCity;
    }
  },
});

export const {setCashedCity} = modalSlice.actions;
export default modalSlice.reducer;
