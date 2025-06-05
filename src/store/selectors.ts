import { store } from "../store";
import { PlayersState, boardState, Symbol } from "../types";

export const getInfoAboutPlayers = (): PlayersState => {
  return store.getState().players;
};

export const getBoard = (): boardState => {
  return store.getState().board;
};

export const getCurrentPlayer = (): Symbol => {
  const numberPlayers =
    store.getState().board.numberOfTurns %
    store.getState().players.players.length;

  if (numberPlayers === 0) {
    return Symbol.X;
  } else if (numberPlayers === 1) {
    return Symbol.O;
  } else {
    return Symbol.nothing;
  }
};
