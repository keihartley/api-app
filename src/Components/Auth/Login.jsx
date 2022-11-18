import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Tools/Firebase/firebase";
import { signInWithGoogle, logInWithEmailAndPassword } from "../../Tools/Firebase/auth";
import { Button, Input, Typography, Stack } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
  return (
    <div>
      <Stack spacing={2} component="form">
        <Typography variant="h5">Login</Typography>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email address"
          type="email"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
        />
        <Button onClick={() => logInWithEmailAndPassword(email, password)} variant="contained">Login</Button>
        <Button onClick={signInWithGoogle} variant="outlined">Sign-In With Google</Button>
        <Typography>
          Don't have an account? <Link to="/register">Register now</Link>
        </Typography>
      </Stack>
    </div>
  );
}

export default Login;
