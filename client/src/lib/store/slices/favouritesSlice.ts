import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { GameFavourites } from "lib/types/components/common";

export type FavouritesState = {
  favourites: GameFavourites[];
};

/**
 * Default state object with initial values.
 */
const initialState: FavouritesState = {
  favourites: [],
};

/**
 * Auth slice with reducer containing actions.
 */
export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourite: (
      state: Draft<FavouritesState>,
      action: PayloadAction<GameFavourites>
    ) => {
      const newFavourites = [...state.favourites];
      newFavourites.push(action.payload);
      state.favourites = newFavourites;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getFavourites = (state: { favourites: FavouritesState }) =>
  state.favourites;

// Exports all actions
export const { setFavourite } = favouritesSlice.actions;

export const favouritesSliceReducer = favouritesSlice.reducer;
