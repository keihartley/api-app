import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { query, getDocs, collection, where, addDoc, setDoc, doc } from "firebase/firestore";
import { createSaved } from "./saved";
const { auth, db } = require("./firebase");

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (
  username,
  email,
  password
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (credential) => {
      const user = credential.user;
      await updateProfile(user, { displayName: username });
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, {
        settings: {
          displayName: username,
          theme: 'light'
          // add any other settings you want to set here
        },
      })
      createSaved(user);
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};
