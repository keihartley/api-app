import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bar from "../Nav/Bar";
import getInfo from "./cocktailFunctions";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

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

  const keys = Object.keys(data);
  const ingredients = getInfo(keys, "strIngredient", data);
  const measurements = getInfo(keys, "strMeasure", data);

  console.log(ingredients, measurements);
  return (
    <Box>
      <Bar />
      {loading && <LinearProgress />}
      <Grid container justifyContent="center">
        <Grid
          item
          xl={5}
          lg={7}
          md={8}
          sm={9}
          xs={11}
          sx={{ padding: "2em" }}
          justifyContent="center"
        >
          <Card>
            <CardMedia
              component="img"
              height="350"
              image={data.strDrinkThumb}
              alt="Paella dish"
            />
            <Stack spacing={1} sx={{ padding: "2em" }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">{data.strDrink}</Typography>
                <div>
                  <Tooltip title="Save">
                    <IconButton>
                      <LibraryAddIcon />
                    </IconButton>
                  </Tooltip>
                  <Button variant='contained' sx={{marginLeft: '1em'}}>Share</Button>
                </div>
              </Stack>
              <Divider />
              <Typography>Type: {data.strAlcoholic}</Typography>
              <Typography>Category: {data.strCategory}</Typography>
              <Typography>Served in {data.strGlass}</Typography>
              <Typography>Instructions: {data.strInstructions}</Typography>
              <Stack direction="row" spacing={1}>
                <List>
                  <ListSubheader>Ingredients</ListSubheader>
                  {ingredients.map((ingredient, index) => (
                    <ListItem key={index}>
                      <ListItemText>{ingredient}</ListItemText>
                    </ListItem>
                  ))}
                </List>

                <List>
                  <ListSubheader>Measurements</ListSubheader>
                  {measurements.map((measure, index) => (
                    <ListItem key={index}>
                      <ListItemText>{measure}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default CocktailDetails;
