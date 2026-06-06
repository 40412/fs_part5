import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import LogoutButton from "./LogOutButton";

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ textTransform: "none" }}
        >
          Blogs
        </Button>

        {user && (
          <Button
            color="inherit"
            component={Link}
            to="/new"
            sx={{ textTransform: "none" }}
          >
            Create new blog
          </Button>
        )}

        {!user && (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
        )}

        {user && <LogoutButton />}

        <Box sx={{ flexGrow: 1 }} />

        {/* <Typography sx={{ marginRight: 2 }}>{user.name} logged in</Typography> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
