import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/firebase";

export default function GetRating(id) {
  const [rating, setRating] = useState(null);
  const [ave, setAve] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function getRating(uid) {
        const docRef = doc(db, "ratings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let ratings = docSnap.data();
          let keys = Object.keys(ratings);
          let total = 0;
          keys.forEach((key) => {
             total += ratings[key]['rating'];
          })
          let aveVal = total / keys.length;
          setAve(aveVal);
          setRating(ratings);
      }
    }
    if (user) {
      getRating(user.uid);
      setLoading(false);
    }
  }, [user, id]);

  return { rating, loading, ave };
}
