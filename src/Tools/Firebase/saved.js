import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createSaved = async (user, saved = ["sample"]) => {
  try {
    await setDoc(doc(db, "saved", user.uid), {
      saved: saved,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error(err);
  }
};
