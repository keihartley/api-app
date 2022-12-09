import { Box } from "@mui/system";
import React from "react";
import Bar from "../../Components/Nav/Bar";
import { Divider, Grid, LinearProgress, Typography } from "@mui/material";
import CocktailListItem from "../../Components/CocktailList/CocktailListItem";
import useFetchCocktail from '../../Tools/Hooks/useFetchCocktail';

function Dashboard() {

  // list of all cocktails by first letter
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";
  const {loading, data} = useFetchCocktail(url);

  return (
    <Box sx={{ height: "100%" }}>
      <Bar />
      {loading && <LinearProgress />}
      <Typography
        align="center"
        gutterBottom={true}
        variant="h4"
        sx={{ margin: "1em" }}
      >
        Discover Cocktails!
      </Typography>
      <Divider />
      <Grid
        container
        spacing={4}
        sx={{ padding: "2.0em" }}
        alignItems="stretch"
      >
        {data.map((item) => (
            <CocktailListItem cocktail={item} key={item.idDrink}/>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
