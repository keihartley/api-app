import { Box } from "@mui/system";
import React, { useState, useCallback, useEffect } from "react";
import Bar from "../../Components/Nav/Bar";
import axios from "axios";
import { Divider, Grid, LinearProgress, Typography } from "@mui/material";
import CocktailListItem from "../../Components/CocktailList/CocktailListItem";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // list of all cocktails by first letter
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

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
  }, []);

  useEffect(() => {
    fetchCocktail();
  }, [fetchCocktail]);

  return (
    <Box sx={{ height: "100%" }}>
      <Bar />
      {loading && <LinearProgress />}
      <Typography
        align="center"
        gutterBottom={true}
        variant="h3"
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
            <CocktailListItem cocktail={item} navigate={navigate} key={item.idDrink}/>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
