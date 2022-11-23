import { useState, useEffect } from "react";
import axios from "axios";

const useFDA = (initURL) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchFDA = async () => {
      setLoading(true);
      try {
        setError({});
        const response = await axios(initURL);
        if (!ignore) setData(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchFDA();
    return () => {
      ignore = true;
    };
  }, [initURL]);

  return { data, loading, error };
};

export default useFDA;
