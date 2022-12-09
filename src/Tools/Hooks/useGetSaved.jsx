import { doc, getDoc } from 'firebase/firestore';
import {useState, useEffect} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase/firebase';

export default function GetSaved() {
    const [saved, setSaved] = useState(null);
    const [user] = useAuthState(auth);
  
    useEffect(() => {
      async function getSave(uid) {
        const docRef = doc(db, "saved", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSaved(docSnap.data().saved);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
  
      if (user) {
        getSave(user.uid);
      }
    }, [user]);
    return {saved};
}