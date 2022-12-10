import {CircularProgress, Rating} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import useGetRating from '../../Tools/Hooks/useGetRating';

export default function CustomRating({id}) {
    const {ave, loading, rating} = useGetRating(id);
    const [val, setVal] = useState(ave);

    useEffect(() => {
        if (ave) {
            setVal(ave);
        }
    }, [ave])

    return (
       <div>
        {loading ? (
            <CircularProgress />
        ) : (
            <Rating value={val} />
        )}
       </div>
    )
}