import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/firebase";

export default function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setSettings(doc.data().settings)
        setLoading(false)
      })
      return () => unsubscribe();
    } else {
      setLoading(true);
      setSettings(null);
    }
  }, [user]);

  return { settings, loading, user };
}