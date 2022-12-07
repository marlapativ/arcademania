import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type {
  FavouritesState,
  GameFavourites,
} from "lib/types/components/common";

/**
 * Default state object with initial values.
 */
const initialState: FavouritesState = {
  favourites: [],
};

/**
 * Favourites slice with reducer containing actions.
 */
export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourite: (
      state: Draft<FavouritesState>,
      action: PayloadAction<GameFavourites[]>
    ) => {
      action.payload.forEach((e) => state.favourites.push(e));
    },
    resetFavourite: (
      state: Draft<FavouritesState>,
      action: PayloadAction<GameFavourites[]>
    ) => {
      const removedGames: GameFavourites[] = action.payload || [];
      const rgSet = new Set(removedGames.map((e) => e.gameId));
      const newTodos = state.favourites.filter((e) => !rgSet.has(e.gameId));
      state.favourites = newTodos;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getFavourites = (state: { favourites: FavouritesState }) =>
  state.favourites;

// Exports all actions
export const { setFavourite, resetFavourite } = favouritesSlice.actions;

export const favouritesSliceReducer = favouritesSlice.reducer;
