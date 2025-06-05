import { useDispatch } from "react-redux";

import { resetPlayers } from "../store/playersSlice";
import { resetBoard, changeSize } from "../store/boardSlice";

const Controls = () => {
  const dispatch = useDispatch();

  const setBoardSize = (size: number) => {
    dispatch(changeSize({ size: size }));
  };

  const startNewGame = () => {
    dispatch(resetBoard());
    dispatch(resetPlayers());
  };

  return (
    <div className="controls">
      <select
        className="boardSizeSelector"
        onChange={(e) => setBoardSize(Number(e.target.value))}
      >
        {[...Array(7)].map((_, i) => {
          const size = i + 3;
          return (
            <option key={size} value={size}>
              {size}x{size}
            </option>
          );
        })}
      </select>
      <button className="newGameButton" onClick={startNewGame}>
        New Game
      </button>
    </div>
  );
};

export default Controls;
