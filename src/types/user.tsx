import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  language: "en" | "pl" | "ru" | "ua";
  completedDays: number;
  createdAt: Timestamp;
  photoUrl: string;
};

export type UserRegistration = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  language: "en" | "pl" | "ru" | "ua";
};

export type UserLogin = {
  email: string;
  password: string;
};

export interface UserState {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  language: "en" | "pl" | "ru" | "ua";
  completedDays: number;
  isLoggedIn: boolean;
  photoUrl: string;
  setUser: (user: Partial<UserState>) => void;
  setUserCompletedDays: (count: number) => void;
  setPhotoUrl: (url: string) => void;
  setLanguage: (lang: "en" | "pl" | "ru" | "ua") => void;
  logout: () => void;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  language?: "en" | "pl" | "ru" | "ua";
  photoUrl?: string;
  photo?: FileList;
}
