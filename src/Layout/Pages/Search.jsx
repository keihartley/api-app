import { useParams } from "react-router-dom";
import React from "react";
import { Grid, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import CocktailListItem from "../../Components/CocktailList/CocktailListItem";
import Bar from "../../Components/Nav/Bar";
import useFetchCocktail from '../../Tools/Hooks/useFetchCocktail';

function Search() {
  const { cocktail } = useParams();
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
  const {data, loading} = useFetchCocktail(url);

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
