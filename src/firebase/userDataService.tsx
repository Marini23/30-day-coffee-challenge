import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { User } from "../types/user";
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

export const fetchUser = async () => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    try {
      const userData = await getUserData(uid);
      if (userData) {
        console.log("User data:", userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  }
};
