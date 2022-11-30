import { useState } from "react";
import { ICard } from "../../../types/icard";
import { Clock } from "react-feather";
import { formatDate } from "../../../services/Helper/Util";
import CardInfo from "./CardInfor/CardInfor";

interface CardProps {
  card: ICard;
  boardId: number;
  removeCard: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

function Card(props: CardProps) {
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } =
    props;
  const { id, title, desc, level, date } = card;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
      <div
        className="card"
        key={card.id}
        draggable
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
      >
        <div className="card-top">
          <div className="card-top-labels">
            <div className="card-title" onClick={() => setShowModal(true)}>
              {title}
            </div>
          </div>

          <div className="card-top-more">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                ...
              </button>
              <ul className="dropdown-menu">
                <li>
                  <p onClick={() => removeCard(boardId, id)}>Delete Card</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p>{desc}</p>
          <div className="card-footer">
            {level}
            {date && (
              <p className="card-footer-item">
                <Clock className="card-footer-icon" />
                {formatDate(date)}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
