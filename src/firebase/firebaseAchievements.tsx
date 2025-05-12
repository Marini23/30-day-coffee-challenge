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

/**
 * Updates the completion status of a specific user achievement.
 */
export const updateUserAchievement = async (
  uid: string,
  achievementId: string,
  isCompleted: boolean
) => {
  if (!uid) throw new Error("updateUserAchievement: Missing userId");

  const userAchievementsRef = doc(db, "achievements", uid); // ✅ 2 segments
  console.log(
    "Updating achievement for user:",
    uid,
    "achievement:",
    achievementId,
    "status:",
    isCompleted
  );

  const docSnap = await getDoc(userAchievementsRef);
  if (!docSnap.exists()) {
    console.warn("User achievements document does not exist.");
    return;
  }

  const currentAchievements: Achievement[] = docSnap.data().achievements;
  console.log(currentAchievements);

  const updatedAchievements = currentAchievements.map((achievement) => {
    console.log(achievement);
    console.log(isCompleted);

    const updatedAchievement =
      achievement.id === achievementId
        ? {
            ...achievement,
            completed: isCompleted,
            updatedAt: Date.now(),
          }
        : achievement;

    console.log(updatedAchievement);
    return updatedAchievement;
  });

  console.log(updatedAchievements);

  await setDoc(userAchievementsRef, { achievements: updatedAchievements });
};
