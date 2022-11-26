import { Box } from "@mui/system";
import React, { useState, useCallback, useEffect } from "react";
import Bar from "../../Components/Nav/Bar";
import axios from "axios";
import { Grid, LinearProgress } from "@mui/material";
import CocktailListItem from '../../Components/CocktailList/CocktailListItem';



function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // list of all cocktails by first letter
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

  const fetchCocktail = useCallback(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data.drinks)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCocktail()
  }, [fetchCocktail])

  return (
    <Box sx={{ height: "100%" }}>
      <Bar />
      {loading && <LinearProgress />}
      <Grid container spacing={4} sx={{padding: '2.0em'}} alignItems='stretch'>
        {data.map((item) => (
          <CocktailListItem key={item.idDrink} cocktail={item}/>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
