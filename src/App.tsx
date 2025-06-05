import { useState } from "react";

import "./App.css";
import PlayersInfo from "./components/playerInfo";
import GameBoard from "./components/gameBoard";
import Controls from "./components/controls";
import Modal from "./components/modal";

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="App">
      <PlayersInfo />
      <GameBoard setIsOpenModal={setIsOpenModal} />
      <Controls />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </div>
  );
}

export default App;
