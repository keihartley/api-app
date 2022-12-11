import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  MenuItem,
  ListItemIcon,
  Menu,
  TextField,
} from "@mui/material";
import { logout } from "../../Tools/Firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Tools/Firebase/firebase";
import {
  AccountCircle,
  Logout,
  Settings,
  LibraryAddOutlined,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function Bar() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading, navigate]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textDecoration: "none" }}
              color="whitesmoke"
              component={Link}
              noWrap
              to="/dashboard"
            >
              Cocktails Access
            </Typography>
            <Search onSubmit={(e) => handleSubmit(e)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledTextField
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                value={search}
              />
            </Search>
            <Tooltip title="Your Profile">
              <IconButton
                onClick={handleMenu}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircle />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => navigate("/profile/saved")}>
          <ListItemIcon>
            <LibraryAddOutlined fontSize="small" />
          </ListItemIcon>
          Saved
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Bar;
