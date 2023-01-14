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

export default function Settings({ setTheme, theme }) {
  console.log(theme)
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const profSetting = (
    <Stack direction="row" spacing={3}>
      <Button>Change Photo</Button>
    </Stack>
  );

  const displaySetting = (
    <Stack direction="column" spacing={3}>
      <Box>
        <TextField value="Username" />
      </Box>
      <Box>
        <TextField value="Password" />
      </Box>
    </Stack>
  );

  const delSetting = (
    <div>
      <Button color='primary'>Click to delete your account</Button>
    </div>
  );

  const themeSetting = (
    <Stack direction="row" spacing={3}>
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={theme}
        onChange={handleThemeChange}
        name="radio-buttons-group"
      >
        <FormControlLabel value="light" control={<Radio  />} label="Light Mode" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark Mode" />
      </RadioGroup>
    </FormControl>
  </Stack>
  );

  return (
    <Box sx={{ height: "100%", backgroundColor: 'background.default',}}>
      <Bar />
      <Grid container justifyContent="center">
        <Paper sx={{ width: 2 / 3, padding: "2em", margin: "3em" }}>
          <Grid container direction="column" justifyContent="center">
            <Typography align="center" variant="h5">
              Settings
            </Typography>
            <Setting type="Profile" val={profSetting} />
            <Divider />
            <Setting type="Display Name" val={displaySetting} />
            <Divider />
            <Setting type="Theme" val={themeSetting} />
            <Divider />
            <Setting type="Delete" val={delSetting} />
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
}
