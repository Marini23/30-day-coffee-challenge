import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { Achievement } from "../types/achievements";

export const createUserAchievements = async (userId: string) => {
  const now = serverTimestamp();

  const achievements: Achievement[] = [
    {
      id: "brew_master",
      icon: "icon-Frame-3",
      completed: true,
      createdAt: serverTimestamp(),
      updatedAt: now,
    },
    {
      id: "coffee_ambassador",
      icon: "icon-Frame-2",
      completed: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "flavor_alchemist",
      icon: "icon-Frame-1",
      completed: true,
      createdAt: now,
      updatedAt: now,
    },
  ];

  await setDoc(doc(db, "achievements", userId), { achievements });
};
