import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TCityWeather } from "../../components/Home/Card";

interface ICityWeatherWithCountToUpdate extends TCityWeather {
  statusUpdate: "" | "start refresh";
}

interface IInitialState {
  [key: string]: ICityWeatherWithCountToUpdate;
}

const initialState: IInitialState = {};

const cashedSlice = createSlice({
  name: "cashed",
  initialState,
  reducers: {
    setCashedCity: (state, action: PayloadAction<{ city: string; dataCity: TCityWeather }>) => {
      const { city, dataCity } = action.payload;
      state[city] = { ...dataCity, statusUpdate: "" };
    },

    refreshCashedData: (state) => {
      for (const [key] of Object.entries(state)) {
        state[key].statusUpdate = "start refresh";
      }
    },
    updateFavorite: (state, action: PayloadAction<{ city: string; isFavorite: boolean }>) => {
      state[action.payload.city].isFavorite = action.payload.isFavorite;
    },
  },
});

export const { setCashedCity, updateFavorite, refreshCashedData } = cashedSlice.actions;
export default cashedSlice.reducer;
