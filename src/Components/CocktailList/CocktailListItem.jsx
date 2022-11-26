import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { Component } from "react";

class CocktailListItem extends Component {
  render() {
    const { cocktail, navigate } = this.props;
    const keys = Object.keys(cocktail);

    const findKeys = (substring) => {
      const res = [];
      keys.find((element) => {
        if (element.includes(substring)) {
          res.push(element);
        }
      });
      return res;
    };

    const ingredientKeys = findKeys("strIngredient");
    const measureKeys = findKeys("strMeasure");

    const findVals = (keys) => {
      const vals = [];
      keys.forEach(function (key) {
        const val = cocktail[key];
        if (val !== null) {
          vals.push(val);
        }
      });
      return vals;
    };

    const ingredients = findVals(ingredientKeys);
    const measures = findVals(measureKeys);

    const handleClick = () => {
      navigate(`/cocktail/${cocktail.strDrink}`);
    }

    return (
        <Card sx={{height: '100%'}} raised>
          <CardMedia component="img" image={cocktail.strDrinkThumb} alt="#" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {cocktail.strDrink}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Category: {cocktail.strAlcoholic} & {cocktail.strCategory}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Instructions: {cocktail.strInstructions}
            </Typography>
            <Grid container direction='row' alignItems='flex-start'>
              <Grid item>
                <List>
                  <ListSubheader>Ingredients</ListSubheader>
                  {ingredients.map((ingredient) => (
                    <ListItem>
                      <ListItemText>{ingredient}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item>
                <List>
                  <ListSubheader>Measurements</ListSubheader>
                  {measures.map((measure) => (
                    <ListItem>
                      <ListItemText>{measure}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <ButtonGroup variant="outlined" fullWidth={true} ><Button onClick={handleClick}>View More</Button><Button color='secondary'>Save To Profile</Button></ButtonGroup>
          </CardActions>
        </Card>
    );
  }
}

export default CocktailListItem;
