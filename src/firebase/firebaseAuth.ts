import {
  createUserWithEmailAndPassword,
  deleteUser,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { User, UserRegistration } from "../types/user";
import { createUserAchievements } from "./firebaseAchievements";
import { createUserTasks } from "./firebaseTasks";
import { useUserStore } from "../store/userStore";

// Sign up with email

const createUserFromRegistration = (
  registration: UserRegistration,
  uid: string
): Omit<User, "createdAt"> => ({
  uid,
  email: registration.email,
  firstName: registration.firstName,
  lastName: registration.lastName,
  language: registration.language,
  completedDays: 0,
  photoUrl: "",
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

    await setDoc(doc(db, "users", user.uid), {
      ...newUser,
      createdAt: serverTimestamp(),
    });

    await createUserAchievements(user.uid);
    await createUserTasks(user.uid);

    useUserStore.getState().setUser({
      ...newUser,
    });

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

// Log in with email

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
      useUserStore.getState().setUser({
        ...userData,
      });
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
    }
    return null;
  }
};

// Sign in with Facebook

const facebookProvider = new FacebookAuthProvider();

export const SignInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    console.log("Signed up  user:", user);
  } catch (error) {
    console.error("Facebook sign up error:", error);
  }
};

//Log out

export const LogOut = async () => {
  try {
    await signOut(auth);
    toast.success(" Successfully logged out.");
  } catch (error) {
    console.log(error);
    toast.error("Logout failed.");
  }
};

//Delete user

export const deleteUserAccount = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error("No authenticated user found");
      return;
    }

    // Delete from Firebase Auth
    await deleteUser(currentUser);
    toast.success("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Failed to delete user");
    throw error;
  }
};
