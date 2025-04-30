import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Section } from "../types/tasks";

export const createUserTasks = async (userId: string) => {
  const tasksList: Section[] = [
    {
      title: "Brewing Basics",
      tasks: [
        {
          number: 1,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 2,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 3,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 4,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 5,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 6,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 7,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 8,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 9,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 10,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
      ],
    },
    {
      title: "Global Coffee Tour",
      tasks: [
        {
          number: 11,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 12,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 13,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 14,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 15,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 16,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 17,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 18,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 19,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 20,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
      ],
    },
    {
      title: "Creativity & Skills",
      tasks: [
        {
          number: 21,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 22,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 23,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 24,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 25,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 26,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 27,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 28,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 29,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
        {
          number: 30,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          completed: false,
        },
      ],
    },
  ];

  await setDoc(doc(db, "tasks", userId), { tasksList });
};
