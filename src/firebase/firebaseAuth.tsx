import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { User, UserRegistration } from "../types/user";
import { createUserAchievements } from "./firebaseAchievements";
import { createUserTasks } from "./firebaseTasks";

// Signed up

const createUserFromRegistration = (
  registration: UserRegistration,
  uid: string
): Omit<User, "createdAt"> => ({
  uid,
  email: registration.email,
  firstName: registration.firstName,
  lastName: registration.lastName,
  language: registration.language,
});

export const SignUpWithEmailPassword = async (data: UserRegistration) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;

    const newUser = createUserFromRegistration(data, user.uid);
    console.log(newUser);

    await setDoc(doc(db, "users", user.uid), {
      ...newUser,
      createdAt: serverTimestamp(),
    });

    await createUserAchievements(user.uid);
    await createUserTasks(user.uid);

    toast.success("You registered successfully!");
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Registration error: " + error.message);
      console.error("Error:", error.message);
    } else {
      toast.error("An unknown error occurred.");
      console.error("Unknown error:", error);
    }
  }
};

// Log in

export const LogInWithEmailPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const userData = userSnap.data() as User;
      toast.success(`Welcome back, ${userData.firstName}!`);
      return userData;
    } else {
      toast.error("User data not found in Firestore.");
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Login error: " + error.message);
    } else {
      toast.error("An unknown login error occurred.");
      console.error("Unknown login error:", error);
    }
    return null;
  }
};
