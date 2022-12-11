import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Bar from "../../Components/Nav/Bar";
import Setting from "../../Components/Setting/Setting";

const prof = (
  <Stack direction="row" spacing={3}>
    <Button>Change Photo</Button>
  </Stack>
);

const display = (
  <Stack direction="column" spacing={3}>
    <Box>
      <TextField value="Username" />
    </Box>
    <Box>
      <TextField value="Password" />
    </Box>
  </Stack>
);
const del = <Button>Click to delete your account</Button>;
const theme = (
  <Stack direction="row" spacing={3}>
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="default" control={<Radio />} label="Default" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark Mode" />
        <FormControlLabel
          value="light"
          control={<Radio />}
          label="Light Mode"
        />
      </RadioGroup>
    </FormControl>
  </Stack>
);

export default function Settings() {
  return (
    <Box sx={{ height: "100%" }}>
      <Bar />
      <Grid container justifyContent='center'>
      <Paper sx={{ width: 2/3, padding: "2em", margin: '3em' }}>
        <Grid container direction="column" justifyContent="center">
        <Typography align="center" variant="h5">
            Settings
          </Typography>
          <Typography align="center" variant="subtitle2">
            Page In Progress
          </Typography>
          <Setting type="Profile" val={prof} />
          <Divider />
          <Setting type="Display Name" val={display} />
          <Divider />
          <Setting type="Theme" val={theme} />
          <Divider />
          <Setting type="Delete" val={del} />
        </Grid>
      </Paper>
      </Grid>
    </Box>
  );
}
