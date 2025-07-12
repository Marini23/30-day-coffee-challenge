import { create } from "zustand";
import { UserState } from "../types/user";
import { LoadingState } from "../types/loading";

export const useUserStore = create<UserState>((set) => ({
  firstName: "",
  uid: "",
  lastName: "",
  email: "",
  language: "en",
  completedDays: 0,
  isLoggedIn: false,
  photoUrl: "",
  setUser: (user) => set((state) => ({ ...state, ...user, isLoggedIn: true })),
  setUserCompletedDays: (count: number) => set({ completedDays: count }),
  setPhotoUrl: (url: string) => set({ photoUrl: url }),
  setLanguage: (lang: "en" | "pl") => set({ language: lang }),
  logout: () =>
    set({
      uid: "",
      firstName: "",
      lastName: "",
      email: "",
      language: "en",
      photoUrl: "",
      completedDays: 0,
      isLoggedIn: false,
    }),
}));

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
}));
