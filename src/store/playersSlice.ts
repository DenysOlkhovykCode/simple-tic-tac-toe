import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Symbol, PlayersState } from "../types";

const initialState: PlayersState = {
  players: [],
  gamesCount: 0,
};

const playersSlice = createSlice({
  name: "playersSlice",
  initialState,
  reducers: {
    addPlayer(state, action: PayloadAction<{ symbol: Symbol }>) {
      state.players.push({
        symbol: action.payload.symbol,
        countOfWins: 0,
        time: 0,
      });
    },

    playerWins(state, action: PayloadAction<{ symbol: Symbol }>) {
      state.players.forEach((player) => {
        if (player.symbol === action.payload.symbol) {
          player.countOfWins += 1;
        }
      });
    },

    updatePlayerTime(
      state,
      action: PayloadAction<{ id: number; time: number }>
    ) {
      state.players[action.payload.id].time += action.payload.time;
    },

    resetPlayers(state) {
      state.players.forEach((player) => {
        player.time = 0;
      });
    },

    increaseCountOfGames(state) {
      state.gamesCount++;
    },
  },
});

export const {
  addPlayer,
  playerWins,
  updatePlayerTime,
  resetPlayers,
  increaseCountOfGames,
} = playersSlice.actions;
export default playersSlice.reducer;
