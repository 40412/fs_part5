// components/LogoutButton.jsx
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default LogoutButton;
