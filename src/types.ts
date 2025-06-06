export enum Symbol {
  X = "X",
  O = "O",
  nothing = "",
}

export interface PlayerState {
  symbol: Symbol;
  countOfWins: number;
  time: number;
}

export interface PlayersState {
  players: PlayerState[];
  gamesCount: number;
}

export interface boardState {
  board: Symbol[][];
  size: number;
  numberOfTurns: number;
  winner: Symbol;
}

export type ModalProps = {
  isOpenModal?: boolean;
  setIsOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
};
