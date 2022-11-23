import { ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Bar from "../../Components/Nav/Bar";

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    let url = new URL("https://api.fda.gov");
    url.pathname = "drug/event.json";
    url.search = new URLSearchParams({
      api_key: process.env.REACT_APP_OPENFDA_API_KEY,
    });
    const params = {
      search: "receivedate:[20040101+TO+20081231]",
      limit: "20",
    };
    for (var key in params) {
      var value = params[key];
      url.searchParams.append(key, value);
    }
    url = decodeURIComponent(url);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data, error, loading);
  return (
    <div>
      <Bar />
      {data && data.map((obj, index) => (
        <li key={index}>{obj.companynumb}</li>
      ))}
      <ul></ul>
    </div>
  );
}

export default Dashboard;
