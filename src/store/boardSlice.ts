import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boardState, Symbol } from "../types";

const initialState: boardState = {
  board: Array.from({ length: 3 }, () => Array(3).fill(Symbol.nothing)),
  size: 3,
  numberOfTurns: 0,
  winner: Symbol.nothing,
};

function checkDirection(
  board: Array<Array<Symbol>>,
  row: number,
  col: number,
  dr: number,
  dc: number,
  symbol: Symbol,
  winLength: number
): boolean {
  let count = 0;
  const N = board.length;

  for (let i = -winLength + 1; i < winLength; i++) {
    const r = row + i * dr;
    const c = col + i * dc;

    if (r >= 0 && r < N && c >= 0 && c < N && board[r][c] === symbol) {
      count++;
      if (count === winLength) return true;
    } else {
      count = 0;
    }
  }
  return false;
}

export function isWinningMove(
  board: Array<Array<Symbol>>,
  row: number,
  col: number,
  symbol: Symbol
): boolean {
  const N = board.length;
  return (
    checkDirection(board, row, col, 0, 1, symbol, N) || // →
    checkDirection(board, row, col, 1, 0, symbol, N) || // ↓
    checkDirection(board, row, col, 1, 1, symbol, N) || // ↘
    checkDirection(board, row, col, 1, -1, symbol, N) // ↙
  );
}

const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    turn(
      state,
      action: PayloadAction<{ row: number; col: number; symbol: Symbol }>
    ) {
      const { row, col, symbol } = action.payload;
      if (state.board[row][col] === Symbol.nothing) {
        state.board[row][col] = symbol;
        state.numberOfTurns += 1;

        if (isWinningMove(state.board, row, col, symbol)) {
          state.winner = symbol;
        }
      }
    },

    resetBoard(state) {
      state.board = Array.from({ length: state.size }, () =>
        Array(state.size).fill(Symbol.nothing)
      );
      state.numberOfTurns = 0;
      state.winner = Symbol.nothing;
    },

    changeSize(state, action: PayloadAction<{ size: number }>) {
      state.size = action.payload.size;
    },
  },
});

export const { turn, resetBoard, changeSize } = boardSlice.actions;
export default boardSlice.reducer;
