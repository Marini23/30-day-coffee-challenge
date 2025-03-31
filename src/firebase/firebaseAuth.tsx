import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { User, UserRegistration } from "../types/user";

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

    await setDoc(doc(db, "users", user.uid), {
      ...newUser,
      createdAt: serverTimestamp(),
    });

    console.log("User registered & data saved:", user);
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
