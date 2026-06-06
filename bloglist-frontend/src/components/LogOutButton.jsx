// components/LogoutButton.jsx
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LogoutButton;
