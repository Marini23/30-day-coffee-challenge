import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Achievement } from "../types/achievements";

export const createUserAchievements = async (userId: string) => {
  const achievements: Achievement[] = [
    {
      id: "brew_master",
      icon: "icon-beans",
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "coffee_ambassador",
      icon: "icon-world",
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "flavor_alchemist",
      icon: "icon-cup",
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
  const achievementDocRef = collection(db, "achievements");
  await setDoc(doc(achievementDocRef, userId), {
    achievements,
  });
};

export const getUserAchievements = async (userId: string) => {
  console.log(userId);
  if (!userId) {
    return;
  }

  try {
    const achievementDocRef = doc(db, "achievements", userId);
    const docSnap = await getDoc(achievementDocRef);
    if (docSnap.exists()) {
      return docSnap.data().achievements;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    throw error;
  }
};
