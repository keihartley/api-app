import { doc, getDoc } from 'firebase/firestore';
import {useState, useEffect} from 'react';
import { db } from '../Firebase/firebase';

export default function GetRating(id) {
    const [rating, setRating] = useState(null);
    const [ave, setAve] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getRating(id) {
            const docRef = doc(db, "ratings", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let ratings = docSnap.data().rating
                const aveVal = ratings.reduce((total, obj) => obj.val + total, 0) / ratings.length;
                setAve(aveVal);
                setRating(ratings);
            }
        }
        if (id) {
            getRating(id);
            setLoading(false);
        }
    }, [id])

    return {rating, loading, ave};
}