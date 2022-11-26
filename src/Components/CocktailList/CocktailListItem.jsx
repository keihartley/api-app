import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { Component } from "react";

class CocktailListItem extends Component {
  render() {
    const { cocktail } = this.props;
    console.log(cocktail);
    return (
      <Grid item>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component='img'
            image={cocktail.strDrinkThumb}
            alt='#'
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">{cocktail.strDrink}</Typography>
            <Typography variant="body1" color="text.secondary">
              Category: {cocktail.strAlcoholic} & {cocktail.strCategory}
            </Typography>
            <Typography variant="body2" color="text.secondary">Instructions: {cocktail.strInstructions}</Typography>
          </CardContent>
          <CardActionArea>
            <Button size='small'>Learn More!</Button>
            <Button size='small'>Save Drink</Button>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default CocktailListItem;
