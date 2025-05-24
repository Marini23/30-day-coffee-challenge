import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  language: "en" | "pl";
  completedDays: number;
  createdAt: Timestamp;
  photoUrl: string;
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

// export type UserState = {
//   uid: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   language: string;
//   completedDays: number;
//   isLoggedIn: boolean;
//   photoUrl: string;
//   setPhotoUrl: (url: string) => void;
//   setUser: (user: Partial<UserState>) => void;
//   setUserCompletedDays: (count: number) => void;
//   logout: () => void;
// };

export interface UserState {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  completedDays: number;
  isLoggedIn: boolean;
  photoUrl: string;
  setUser: (user: Partial<UserState>) => void;
  setUserCompletedDays: (count: number) => void;
  setPhotoUrl: (url: string) => void;
  setLanguage: (lang: string) => void;
  logout: () => void;
}
