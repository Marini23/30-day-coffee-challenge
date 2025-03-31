import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  language: "en" | "pl";
  createdAt: Timestamp;
};

export type UserRegistration = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  language: "en" | "pl";
};

export type UserLogin = {
  email: string;
  password: string;
};
