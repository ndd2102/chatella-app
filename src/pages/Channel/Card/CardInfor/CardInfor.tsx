import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Trash, Type } from "react-feather";
import Modal from "../../../../components/Modal/Modal";
import CustomInput from "../../../../components/CustomInput/CustomInput";

import "./CardInfor.css";
import { ICard } from "../../../../types/icard";

interface CardInfoProps {
  onClose: () => void;
  card: ICard;
  boardId: number;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}
function CardInfo(props: CardInfoProps) {
  const { onClose, card, boardId, updateCard } = props;
  const [cardValues, setCardValues] = useState<ICard>({
    ...card,
  });

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value: string) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const updateTask = (value: string) => {
    setCardValues({
      ...cardValues,
      tasks: value,
    });
  };

  const updateDate = (date: string) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardValues]);

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description</p>
          </div>
          <CustomInput
            defaultValue={cardValues.desc}
            text={cardValues.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={cardValues.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <CustomInput
            defaultValue={cardValues.tasks}
            text={cardValues.tasks || "Add a Task"}
            placeholder="Enter task"
            onSubmit={updateTask}
          />
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
