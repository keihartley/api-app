import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../Tools/Firebase/firebase";
import { sendPasswordReset } from "../../Tools/Firebase/auth";
import { Box, Button, Input, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import background from "../../Assets/AuthBackground.jpg";

function Reset() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    sendPasswordReset(email);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${background})`,
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={6} sx={{ padding: "3em" }}>
        <Stack
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          component="form"
          direction="column"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography component="h1" variant="h5">
            Forgot your Email?
          </Typography>
          <Input
            type="email"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="Enter your e-mail address"
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Password Reset Email
          </Button>
          <Typography>
            Don't have an account? <Link to="/register">Register here</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Reset;
