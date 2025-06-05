import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { turn } from "../store/boardSlice";
import {
  playerWins,
  increaseCountOfGames,
  updatePlayerTime,
} from "../store/playersSlice";
import {
  getBoard,
  getCurrentPlayer,
  getInfoAboutPlayers,
} from "../store/selectors";
import { Symbol, ModalProps } from "../types";

const GameBoard = ({ setIsOpenModal }: ModalProps) => {
  const dispatch = useDispatch();
  const board = useSelector(getBoard);
  const currentPlayer = useSelector(getCurrentPlayer);
  const players = useSelector(getInfoAboutPlayers);
  const [endOfLastTime, setEndOfLastTime] = useState<number>(Date.now());

  const Turn = (row: number, col: number) => {
    dispatch(turn({ row, col, symbol: currentPlayer }));

    players.players.forEach((player, index) => {
      if (player.symbol === currentPlayer) {
        const time = Math.floor((Date.now() - endOfLastTime) / 1000);
        dispatch(updatePlayerTime({ id: index, time }));
        setEndOfLastTime(Date.now());
      }
    });
  };

  useEffect(() => {
    if (board.winner !== Symbol.nothing) {
      dispatch(playerWins({ symbol: board.winner }));
      dispatch(increaseCountOfGames());
      setTimeout(() => {
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
        setIsOpenModal(true);
      }, 2000);
    }
  }, [board.board, dispatch, setIsOpenModal]);

  return (
    <div className="gameBoard">
      {board.board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell">
              <button onClick={() => Turn(rowIndex, colIndex)}>{cell}</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
