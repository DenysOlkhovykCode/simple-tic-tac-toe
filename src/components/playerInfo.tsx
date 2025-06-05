import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Symbol } from "../types";
import { addPlayer, updatePlayerTime } from "../store/playersSlice";
import { getInfoAboutPlayers, getCurrentPlayer } from "../store/selectors";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const PlayersInfo = () => {
  const dispatch = useDispatch();
  const players = useSelector(getInfoAboutPlayers);
  const currentPlayer = useSelector(getCurrentPlayer);

  useEffect(() => {
    if (players.players.length === 0) {
      dispatch(addPlayer({ symbol: Symbol.X }));
      dispatch(addPlayer({ symbol: Symbol.O }));
    }
  }, [players.players.length, dispatch]);

  useEffect(() => {
    if (players.players.length === 0) return;

    const currentPlayerId = players.players.findIndex(
      (p) => p.symbol === currentPlayer
    );

    const interval = setInterval(() => {
      dispatch(updatePlayerTime({ id: currentPlayerId, time: 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayer, dispatch, players.players]);

  return (
    <div className="playersInfoWrapper">
      <div className="playersInfo">
        {players.players.map((player, index) => (
          <div
            key={index}
            className={`playerCard ${
              currentPlayer === player.symbol ? "currentPlayer" : ""
            }`}
          >
            {formatTime(player.time || 0)} <br />
            Player {index + 1} {player.symbol} <br />
            <span className="playerWins">Wins - {player.countOfWins}</span>
          </div>
        ))}
      </div>
      <div className="gamesCount">Games played: {players.gamesCount}</div>
    </div>
  );
};

export default PlayersInfo;
