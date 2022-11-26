import {
  Card,
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
    const { cocktail, key } = this.props;
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

    return (
      <Grid item xs={12} sm={6} md={4} key={key}>
        <Card sx={{height: '100%'}}>
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
        </Card>
      </Grid>
    );
  }
}

export default CocktailListItem;
