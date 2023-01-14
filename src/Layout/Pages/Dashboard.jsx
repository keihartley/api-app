import { Box } from "@mui/system";
import React from "react";
import { Grid, LinearProgress } from "@mui/material";
import CocktailListItem from "../../Components/CocktailList/CocktailListItem";
import useFetchCocktail from "../../Tools/Hooks/useFetchCocktail";
import { useTheme } from "@emotion/react";

function Dashboard({ barRef }) {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";
  const theme = useTheme();
  const { loading, data } = useFetchCocktail(url);

  return (
    <Box
      sx={{ background: theme.palette.background.default, padding: "3em" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth="100vw"
      overflow="auto"
      minHeight={`calc(100vh - ${
        barRef.current ? barRef.current.offsetHeight : 0
      }px)`}
    >
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container maxWidth="xl" justify="center" spacing={4}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={5} lg={4} xl={3} key={index}>
              <CocktailListItem cocktail={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;
