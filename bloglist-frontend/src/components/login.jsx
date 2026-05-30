import { useState, useContext } from "react";
import loginService from "../services/login";
import { AuthContext } from "../context/authcontext";

export const LoginForm = ({ showNotification }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    } catch (e) {
      console.log(e);
      showNotification("Wrong credentials", "error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
