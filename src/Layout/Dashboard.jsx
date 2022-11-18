import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { logout } from "../Tools/Firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Tools/Firebase/firebase";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading, navigate]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      Logged in as
      <div>{user?.email}</div>
    </div>
  );
}

export default Dashboard;
