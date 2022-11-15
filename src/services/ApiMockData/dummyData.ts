import { IBoard } from "../../types/board";

export const ApiMockResponse: IBoard[] = [
  {
    id: 1,
    title: "To-do",
    cards: [
      {
        id: 1,
        title: "Task1",
        desc: "Task Description",
        level: "Critical",
        date: "2022-05-05",
        tasks: "",
      },
      {
        id: 2,
        title: "Task2",
        desc: "Task Description",
        level: "Important",
        date: "2022-05-05",
        tasks: "",
      },
    ],
  },

  {
    id: 2,
    title: "In Progress",
    cards: [
      {
        id: 1,
        title: "Task3",
        desc: "Task Description",
        level: "Critical",
        date: "2022-05-05",
        tasks: "",
      },
    ],
  },

  {
    id: 3,
    title: "Done",
    cards: [
      {
        id: 1,
        title: "Task4",
        desc: "Task Description",
        level: "Important",
        date: "2022-05-05",
        tasks: "",
      },
    ],
  },
];
