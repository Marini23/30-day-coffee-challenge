import { Timestamp } from "firebase/firestore";

export type Task = {
  id: string;
  number: number;
  title: string;
  description: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  completed: boolean;
};

export type Section = {
  id: string;
  title: string;
  tasks: Task[];
};
