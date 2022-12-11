import { CircularProgress, Rating } from "@mui/material";
import { Stack } from "@mui/system";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../../Tools/Firebase/firebase";
import useGetRating from "../../Tools/Hooks/useGetRating";

export default function CustomRating({ id, readOnly = false }) {
  const { ave, loading } = useGetRating(id);
  const [val, setVal] = useState(ave);

  useEffect(() => {
    if (ave) {
      setVal(ave);
    }
  }, [ave]);

  async function handleRating(newVal) {
    let uid = await auth.currentUser.uid;
    setVal(newVal);
    if (uid) {
      const ratingRef = doc(db, "ratings", id);
      const docSnap = await getDoc(ratingRef);
      if (docSnap.exists()) {
        await updateDoc(ratingRef, {
          [`${uid}`]: {
            rating: newVal,
          },
        });
      } else {
        await setDoc(doc(db, "ratings", id), {
          [`${uid}`]: {
            rating: newVal,
          },
        });
      }
    }
  }

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack direction="row" spacing={2}>
          <Rating
            value={val}
            readOnly={readOnly}
            onChange={(e, newVal) => {
              handleRating(newVal);
            }}
          />
        </Stack>
      )}
    </div>
  );
}
