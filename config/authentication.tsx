// lib/authService.js
import { auth, onAuthStateChanged, signInAnonymously } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firebase firestore instance

const initAuth = () => {
  return new Promise(async (resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve(user);

        // Create or update session data in Firestore
        const sessionRef = doc(db, "sessions", user.uid);
        await setDoc(sessionRef, { uid: user.uid });
      } else {
        signInAnonymously(auth)
          .then(async () => {
            // Successfully signed in anonymously
            const currentUser = auth.currentUser;
            resolve(currentUser);

            // Create or update session data in Firestore
            const sessionRef = doc(db, "sessions", currentUser.uid);
            await setDoc(sessionRef, { uid: currentUser.uid });
          })
          .catch((error) => {
            console.error("Anonymous sign-in error:", error);
            reject(error);
          });
      }
    });
  });
};

export default initAuth