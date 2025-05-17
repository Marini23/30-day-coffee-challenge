import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Achievement } from "../types/achievements";

/**
 * Creates initial achievements for a user in Firestore.
 */
export const createUserAchievements = async (userId: string) => {
  if (!userId) throw new Error("createUserAchievements: Missing userId");

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

  const achievementDocRef = doc(db, "achievements", userId); // ✅ doc ref with 2 segments
  console.log("Creating achievements for user:", userId);

  await setDoc(achievementDocRef, { achievements });
};

/**
 * Retrieves a user's achievements from Firestore.
 */
export const getUserAchievements = async (userId: string) => {
  if (!userId) throw new Error("getUserAchievements: Missing userId");

  try {
    const achievementDocRef = doc(db, "achievements", userId); // ✅ 2 segments
    const docSnap = await getDoc(achievementDocRef);

    if (docSnap.exists()) {
      return docSnap.data().achievements as Achievement[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    throw error;
  }
};

export const updateUserAchievement = async (
  uid: string,
  updatedAchievements: Achievement[]
) => {
  const userAchievementsRef = doc(db, "achievements", uid);
  await setDoc(userAchievementsRef, { achievements: updatedAchievements });
};
