import { Grid, Typography } from "@mui/material";

export default function Setting({ type, val }) {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginBottom: "2em", marginTop: "1em" }}
      spacing={6}
    >
      <Grid item xs={2} justifyContent="flex-end">
        <Typography align="right" variant="subtitle1">
          {type}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {val}
      </Grid>
    </Grid>
  );
}
