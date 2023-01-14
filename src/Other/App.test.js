import { render, screen } from '@testing-library/react';
import App from '../Layout/App';
import CocktailCard from "../Components/CocktailList/CocktailCard";
import { testSnapshot, testRendering, testProps } from "./testUtils";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('CocktailCard', () => {
  const cocktail = {
    idDrink: '12345',
    strDrink: 'Mojito',
    strDrinkThumb: 'https://www.example.com/mojito.jpg',
    strInstructions: 'Muddle mint leaves with sugar and lime juice. Add rum and soda water. Stir and garnish with mint sprig.',
  };

  testSnapshot(CocktailCard);
  testRendering(CocktailCard, { cocktail });
  testProps(CocktailCard, { cocktail });
});