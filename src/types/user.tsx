import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  language: "en" | "pl";
  completedDays: number[];
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

export type UserState = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  completedDays: number[];
  isLoggedIn: boolean;
  setUser: (user: Partial<UserState>) => void;
  logout: () => void;
};
