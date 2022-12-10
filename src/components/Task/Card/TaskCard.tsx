import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Card } from "../../../types/card";
import { Channel } from "../../../types/channel";
import { Profile } from "../../../types/profile";

function TaskCard(props: { card: Card; channel: Channel; members: Profile[] }) {
  const [card, setCard] = useState<Card>(props.card);

  useEffect(() => {
    setCard(props.card);
  }, [props.card]);

  const styleHigh = `rounded-lg p-2 font-base text-xs text-red-500 bg-red-200`;
  const styleMedium =
    "rounded-lg p-2 font-base text-xs text-orange-500 bg-orange-200";
  const styleLow =
    "rounded-lg p-2 font-base text-xs text-green-400 bg-green-200";

  return (
    <>
      <div className="p-4 rounded-lg bg-white my-2 h-36 drop-shadow hover:bg-neutral-50 hover:cursor-pointer">
        <h3 className="font-base text-lg">{card.title}</h3>
        <p className="mt-1.5 h-12 text-base truncated text-gray-400 font-light">
          {card.description}
        </p>
        <div className="flex justify-between">
          <div
            className={
              card.priority === "Low"
                ? styleLow
                : card.priority === "Medium"
                ? styleMedium
                : styleHigh
            }
          >
            {card.priority}
          </div>
          <div className="-mb-8">
            <Avatar.Group>
              {props.members.map((member, index) => {
                return (
                  <Avatar
                    key={index}
                    img={member.avatar}
                    rounded={true}
                    stacked={true}
                  />
                );
              })}
            </Avatar.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskCard;
