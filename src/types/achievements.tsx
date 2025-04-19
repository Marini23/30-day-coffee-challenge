import { FieldValue, Timestamp } from "firebase/firestore";

export type Achievement = {
  id: string;
  icon: string;
  completed: boolean;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
};
