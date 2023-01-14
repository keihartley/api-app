import { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";

export default function useSettings(currentUser) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("settings")
      .doc("settings")
      .onSnapshot((doc) => {
        setSettings(doc.data());
        setLoading(false);
      });
    return () => unsubscribe();
  }, [currentUser]);

  return [settings, loading];
}
