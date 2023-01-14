import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../Firebase/firebase";

export default function GetReview(id) {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const unsubscribe = onSnapshot(doc(db, "reviews", id), (res) => {
        setReviews(res.data())
        setLoading(false)
      })
      return () => unsubscribe();
    } else {
      setLoading(true);
      setLoading(null);
    }
  }, [id]);

  return { reviews, loading };
}
