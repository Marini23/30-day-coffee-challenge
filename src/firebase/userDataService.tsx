import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { User, UserUpdate } from "../types/user";
import { useUserStore } from "../store/userStore";
import { onAuthStateChanged } from "firebase/auth";

// get user data

const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return userSnap.data() as User;
    } else {
      console.warn("No user document found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const fetchUser = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userData = await getUserData(user.uid);
        if (userData) {
          useUserStore.getState().setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    }
  });
};

export const updateUserCompletedDays = async (
  uid: string,
  completedDays: number
) => {
  const userRef = doc(db, "users", uid);
  useUserStore.getState().setUserCompletedDays(completedDays);

  await updateDoc(userRef, {
    completedDays: completedDays,
  });
};

export const updateUserProfile = async (uid: string, updates: UserUpdate) => {
  const userRef = doc(db, "users", uid);
  try {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    const currentData = userSnap.data() as User;

    const mergedData = {
      ...currentData,
      ...updates,
    };

    await updateDoc(userRef, mergedData);

    useUserStore.getState().setUser(updates);

    toast.success("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Failed to update profile");
    throw error;
  }
};

export const updateUserPhoto = async (userId: string, photoUrl: string) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    photoUrl,
  });
};
