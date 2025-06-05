import { configureStore } from "@reduxjs/toolkit";
import playersSlice from "./playersSlice";
import boardSlice from "./boardSlice";

export const store = configureStore({
  reducer: {
    players: playersSlice,
    board: boardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
