import { create } from "zustand";
import { UserState } from "../types/user";

export const useUserStore = create<UserState>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  language: "en",
  completedDays: [],
  isLoggedIn: false,
  setUser: (user) => set((state) => ({ ...state, ...user, isLoggedIn: true })),
  logout: () =>
    set({
      firstName: "",
      lastName: "",
      email: "",
      language: "en",
      completedDays: [],
      isLoggedIn: false,
    }),
}));
