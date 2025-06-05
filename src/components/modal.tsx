import { ModalProps } from "../types";
import { useSelector } from "react-redux";

import { getBoard, getInfoAboutPlayers } from "../store/selectors";

const Modal = ({ isOpenModal, setIsOpenModal }: ModalProps) => {
  let winner = -1;
  const winnerSymbol = useSelector(getBoard).winner;
  const players = useSelector(getInfoAboutPlayers).players;

  players.forEach((player, index) => {
    if (player.symbol === winnerSymbol) {
      winner = index;
    }
  });

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      e.target instanceof Element &&
      e.target.classList.contains("modal-overlay")
    ) {
      closeModal();
    }
  };

  return (
    <>
      {isOpenModal && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal">
            {winner >= 0 && (
              <p>
                Player {winner + 1} win in {players[winner].time} seconds
              </p>
            )}
            {winner === -1 && <p>It's a draw. Try again</p>}
            <button className="close-button" onClick={closeModal}>
              ОК
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
