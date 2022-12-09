import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../Tools/Firebase/auth";
import { auth } from "../../Tools/Firebase/firebase";
import { Button, Input, Typography, Stack, Box, Paper } from "@mui/material";
import background from '../../Assets/AuthBackground.jpg';

function Register() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    registerWithEmailAndPassword(username, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
  return (
    <Box
      sx={{ width: "100%", height: "100%", backgroundImage: `url(${background})` }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={6} sx={{padding: '3em'}}>
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
        <Typography variant="h5">Register</Typography>
        <Input
          required
          fullWidth
          id="username"
          placeholder="Username"
          name="username"
          autoComplete="username"
          type="text"
          autoFocus
        />
        <Input
          required
          fullWidth
          id="email"
          placeholder="Email Address"
          name="email"
          autoComplete="email"
          type="email"
          autoFocus
        />
        <Input
          required
          fullWidth
          id="password"
          placeholder="Password"
          name="password"
          autoComplete="password"
          type="password"
          autoFocus
        />
        <Button
          fullWidth
          type="submit"
          sx={{ mt: 3, mb: 2 }}
          variant="contained"
        >
          Register
        </Button>
        <Button
          onClick={signInWithGoogle}
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Register With Google
        </Button>
        <Typography>
          Already have an account? <Link to="/">Login here</Link>
        </Typography>
      </Stack>
      </Paper>
    </Box>
  );
}

export default Register;
