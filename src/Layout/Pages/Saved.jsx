import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import Bar from "../../Components/Nav/Bar";
import useGetSaved from "../../Tools/Hooks/useGetSaved";

export default function Saved() {
  const { saved } = useGetSaved();

  return (
    <Box>
      <Bar />
      <Grid container spacing={4} sx={{ padding: "3em" }} alignItems="stretch">
        {saved != null &&
          saved.length >= 1 &&
          saved.map((save, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={save.strDrinkThumb}
                  alt="Cocktail Thumbnail"
                />
                <CardContent>
                  <CardHeader title={save.strDrink} />
                  <Stack direction="row" spacing={1}>
                    <Chip label={save.strAlcoholic} />
                    <Chip label={save.strCategory} variant="outlined" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
