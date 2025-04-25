import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Achievement } from "../types/achievements";

export const createUserAchievements = async (userId: string) => {
  const achievements: Achievement[] = [
    {
      id: "brew_master",
      icon: "icon-Frame-3",
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "coffee_ambassador",
      icon: "icon-Frame-2",
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "flavor_alchemist",
      icon: "icon-Frame-1",
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  const achievementDocRef = doc(db, "achievements", userId);
  await setDoc(achievementDocRef, { achievements });
};
