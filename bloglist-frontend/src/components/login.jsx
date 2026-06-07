import { useState, useContext } from "react";
import loginService from "../services/login";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const LoginForm = ({ showNotification }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService({
        username,
        password,
      });

      login(user);

      showNotification("Successfully logged in", "success");

      setUsername("");
      setPassword("");
      navigate("/");
    } catch (e) {
      console.log(e);
      showNotification("Wrong credentials", "error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ margin: 10 }}>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={{ margin: 10 }}>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};
