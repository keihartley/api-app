import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bar from "../Nav/Bar";

function CocktailDetails() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(url);
    async function fetchCocktail() {
      setLoading(true);
      await axios
        .get(url)
        .then((res) => {
          setData(res.data.drinks[0]);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
    fetchCocktail();
  }, [id]);

  console.log(data, loading);

  return (
    <Box>
      <Bar />
      <>Add Crumbs Here</>
      <Paper sx={{margin: '2em', padding: '2em'}}>
        <Grid container direction='row' justifyContent='space-between'>
            <Grid item>
                <img src={data.strDrinkThumb} alt="" style={{maxHeight: "300px"}} />
            </Grid>
            <Grid item>
                <Button sx={{float: 'right'}}>Save Cocktail</Button>
            <Typography variant='h4'>{data.strDrink}</Typography>
            <Typography>Type: {data.strAlcoholic}</Typography>
            <Typography>Category: {data.strCategory}</Typography>
            <Typography>Served in {data.strGlass}</Typography>
            <Typography>Instructions: {data.strInstructions}</Typography>
            </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
export default CocktailDetails;
