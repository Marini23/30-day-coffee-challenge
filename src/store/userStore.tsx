import { create } from "zustand";
import { UserState } from "../types/user";
import { LoadingState } from "../types/loading";
import { Achievement, AchievementsState } from "../types/achievements";

export const useUserStore = create<UserState>((set) => ({
  firstName: "",
  uid: "",
  lastName: "",
  email: "",
  language: "pl",
  completedDays: 0,
  isLoggedIn: false,
  photoUrl: "",
  setUser: (user) => set((state) => ({ ...state, ...user, isLoggedIn: true })),
  setUserCompletedDays: (count: number) => set({ completedDays: count }),
  setPhotoUrl: (url: string) => set({ photoUrl: url }),
  setLanguage: (lang: "en" | "pl" | "ua" | "ru") => set({ language: lang }),
  logout: () =>
    set({
      uid: "",
      firstName: "",
      lastName: "",
      email: "",
      language: "pl",
      photoUrl: "",
      completedDays: 0,
      isLoggedIn: false,
    }),
}));

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
}));

export const useAchievementsStore = create<AchievementsState>((set) => ({
  achievements: [],
  updateAchievement: (id: string, updatedData: Partial<Achievement>) =>
    set((state) => ({
      achievements: state.achievements.map((a) =>
        a.id === id ? { ...a, ...updatedData } : a
      ),
    })),
  setAchievements: (achievements) => set({ achievements }),
}));
