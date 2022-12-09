import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function FetchCocktail(url) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
   
    const fetchCocktail = useCallback(() => {
      setLoading(true);
      axios
        .get(url)
        .then((res) => {
          setData(res.data.drinks);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }, [url]);
  
    useEffect(() => {
      fetchCocktail();
    }, [fetchCocktail]);

    if (data.length === 1) {
      return {data: data[0], loading: loading};
    }

    return {data, loading};
}