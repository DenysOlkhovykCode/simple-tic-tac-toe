import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { turn } from "../store/boardSlice";
import { playerWins, increaseCountOfGames } from "../store/playersSlice";
import {
  getBoard,
  getCurrentPlayerID,
  getInfoAboutPlayers,
} from "../store/selectors";
import { Symbol, ModalProps } from "../types";

const GameBoard = ({ setIsOpenModal }: ModalProps) => {
  const dispatch = useDispatch();
  const board = useSelector(getBoard);
  const currentPlayerId = useSelector(getCurrentPlayerID);
  const players = useSelector(getInfoAboutPlayers);

  const Turn = (row: number, col: number) => {
    dispatch(
      turn({ row, col, symbol: players.players[currentPlayerId].symbol })
    );
  };

  useEffect(() => {
    if (board.winner !== Symbol.nothing) {
      dispatch(playerWins({ symbol: board.winner }));
      dispatch(increaseCountOfGames());
      setTimeout(() => {
        if (!setIsOpenModal) return;
        setIsOpenModal(true);
      }, 2000);
    }
  }, [board.winner, dispatch, setIsOpenModal]);

  useEffect(() => {
    let count = 0;

    board.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell === Symbol.nothing) {
          count++;
        }
      });
    });

    if (count === 0) {
      dispatch(increaseCountOfGames());
      setTimeout(() => {
        if (!setIsOpenModal) return;
        setIsOpenModal(true);
      }, 2000);
    }
  }, [board.board, dispatch, setIsOpenModal]);

  return (
    <div data-testid="board" className="gameBoard">
      {board.board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell">
              <button
                data-testid="cell"
                onClick={() => Turn(rowIndex, colIndex)}
              >
                {cell}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
