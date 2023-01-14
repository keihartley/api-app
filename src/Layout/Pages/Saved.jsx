import {
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import useGetSaved from "../../Tools/Hooks/useGetSaved";
import CocktailListItem from '../../Components/CocktailList/CocktailListItem';

export default function Saved() {
  const { saved } = useGetSaved();

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid
          container
          spacing={4}
          sx={{ padding: "3em", maxWidth: 1500 }}
          alignItems="stretch"
        >
          {saved != null &&
            saved.length >= 1 &&
            saved.map((save, index) => (
              <CocktailListItem cocktail={save} key={index} />
            ))}
        </Grid>
      </Grid>
    </Box>
  );
}
