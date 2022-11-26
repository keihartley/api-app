import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import CocktailListItem from "../../Components/CocktailList/CocktailListItem";
import Bar from "../../Components/Nav/Bar";

function Search() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { cocktail } = useParams();

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
    console.log(url)
    async function fetchCocktail() {
      setLoading(true);
      await axios
        .get(url)
        .then((res) => {
          setData(res.data.drinks);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    };
    fetchCocktail()
  }, [cocktail]);

  return (
    <Box sx={{ height: "100%" }}>
      <Bar />
      {loading && <LinearProgress />}
      <Grid container spacing={4} sx={{ padding: "2.0em" }}>
        {data ? (
          data.map((item) => (
            <CocktailListItem key={item.idDrink} cocktail={item} />
          ))
        ) : (
          <div>No such cocktail</div>
        )}
      </Grid>
    </Box>
  );
}

export default Search;
