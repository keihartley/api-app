import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Tools/Firebase/firebase";
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "../../Tools/Firebase/auth";
import { Button, Input, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import background from "../../Assets/AuthBackground.jpg";

function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    logInWithEmailAndPassword(email, password);
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
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
          direction="column"
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography component="h1" variant="h5" color='black'>
            Login
          </Typography>
          <Input
            required
            fullWidth
            id="email"
            placeholder="Email address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{color: 'black'}}
          />
          <Input
            required
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{color: 'black'}}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Button
            onClick={signInWithGoogle}
            fullWidth
            variant="outlined"
            color='secondary'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign-In With Google
          </Button>
          <Typography>
            Don't have an account? <Link to="/register">Register here</Link>
          </Typography>
          <Typography variant="body2" color='darkblue'>
            Forgot password? <Link to="/reset" style={{color: 'darkblue'}}>Reset here</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;
