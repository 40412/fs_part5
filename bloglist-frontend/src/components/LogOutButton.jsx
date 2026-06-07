// components/LogoutButton.jsx
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleLogout}>
        logout
      </Button>
    </div>
  );
};

export default LogoutButton;
