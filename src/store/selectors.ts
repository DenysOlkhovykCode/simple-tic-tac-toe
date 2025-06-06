import { store } from "../store";
import { PlayersState, boardState } from "../types";

export const getInfoAboutPlayers = (): PlayersState => {
  return store.getState().players;
};

export const getBoard = (): boardState => {
  return store.getState().board;
};

export const getCurrentPlayerID = (): number => {
  return (
    store.getState().board.numberOfTurns %
    store.getState().players.players.length
  );
};
