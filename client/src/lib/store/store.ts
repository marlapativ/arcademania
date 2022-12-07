import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

import { authSliceReducer } from "./slices/authSlice";
import { favouritesSliceReducer } from "./slices/favouritesSlice";
import { leaderboardSliceReducer } from "./slices/leaderboardSlice";

/**
 * Configuring Redux Store.
 */
const store = configureStore({
  reducer: {
    leaderboard: leaderboardSliceReducer,
    auth: authSliceReducer,
    favourites: favouritesSliceReducer,
  },
  devTools: true,
});

const makeStore = () => store;

/**
 * Helper Types.
 */
export type Store = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/**
 * Create Wrapper for redux store.
 */
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
