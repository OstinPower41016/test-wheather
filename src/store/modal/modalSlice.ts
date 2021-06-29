import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IInitialState = {
  isOpen: boolean;
  searchText: string;
  allFavoriteCities: string;
};

const initialState: IInitialState = {
  isOpen: false,
  searchText: "",
  allFavoriteCities: localStorage.getItem("favoriteCities") || "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setStatusModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSearchText: (state, action: PayloadAction<{ searchText: string }>) => {
      state.searchText = action.payload.searchText;
    },
    addFavoriteCity: (state, action: PayloadAction<{ city: string }>) => {
      state.allFavoriteCities = state.allFavoriteCities + " " + action.payload.city;
      if (action.payload.city.length !== 0) {
        localStorage.setItem("favoriteCities", state.allFavoriteCities);
      }
    },
    removeFavoriteCity: (state, action: PayloadAction<{ city: string }>) => {
      console.log(action.payload.city);
      const citiesArr = state.allFavoriteCities.split(" ");
      const findToRemoveIndex = citiesArr.findIndex((val) => val === action.payload.city);
      citiesArr.splice(findToRemoveIndex, 1);
      const updatedAllFavorite = citiesArr.join(" ");
      state.allFavoriteCities = updatedAllFavorite;

      if (updatedAllFavorite.trim().length === 0) {
        localStorage.removeItem("favoriteCities");
      } else {
        localStorage.setItem("favoriteCities", updatedAllFavorite);
      }
    },
  },
});

export const { setStatusModal, setSearchText, addFavoriteCity, removeFavoriteCity } =
  modalSlice.actions;

export default modalSlice.reducer;
