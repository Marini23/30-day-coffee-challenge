import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC-WA9qNWnnMGDVdE_H_9-ujk0icajjdU4",
  authDomain: "day-coffee-challenge.firebaseapp.com",
  projectId: "day-coffee-challenge",
  storageBucket: "day-coffee-challenge.firebasestorage.app",
  messagingSenderId: "246878071745",
  appId: "1:246878071745:web:dddf5ad71119a71b719d40",
  measurementId: "G-T2QL8WJ78P",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
