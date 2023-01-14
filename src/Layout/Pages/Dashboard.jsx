import { Box } from "@mui/system";
import React from "react";
import Bar from "../../Components/Nav/Bar";
import {
  Container,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import CocktailListItem from "../../Components/CocktailList/CocktailListItem";
import useFetchCocktail from "../../Tools/Hooks/useFetchCocktail";

function Dashboard() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";
  const { loading, data } = useFetchCocktail(url);

  return (
    <Box sx={{ height: "100%" }}>
      <Bar />
      {loading ? (
        <LinearProgress />
      ) : (
        <Container>
          <Typography
            align="center"
            gutterBottom={true}
            variant="h4"
            sx={{ margin: "2em" }}
          >
            Discover Cocktails!
          </Typography>
          <Divider sx={{ marginBottom: "3em " }} />
          <Grid
            container
            justifyContent="center"
            spacing={4}
            sx={{ padding: "auto" }}
          >
            {data.map((item, index) => (
              <CocktailListItem key={index} cocktail={item} />
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
}

export default Dashboard;
