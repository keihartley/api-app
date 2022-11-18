import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword, signInWithGoogle } from '../../Tools/Firebase/auth';
import { auth } from '../../Tools/Firebase/firebase';
import { Button, Input, Typography, Stack } from "@mui/material";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()
  const register = () => {
    if (!username) alert("Please enter name");
    registerWithEmailAndPassword(username, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate.replace("/dashboard");
  }, [user, loading, navigate]);
  return (
    <div>
        <Stack spacing={2} component="form">
        <Typography variant="h5">Register</Typography>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"
          type="text"
        />
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
        <Button onClick={register} variant="contained">Register</Button>
        <Button onClick={signInWithGoogle} variant="outlined">Register With Google</Button>
        <Typography>
        Already have an account? <Link to="/">Login now</Link>
        </Typography>
      </Stack>
    </div>
  );
}

export default Register;
