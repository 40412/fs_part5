import { useEffect, useContext } from "react";
import { LoginForm } from "./components/login";
import { AuthContext } from "./context/authcontext";
import { BlockList } from "./components/BlogList";

const App = () => {
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    const savedUser = window.localStorage.getItem("loggedUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      login(parsed);
    }
  }, []);

  if (!user) return <LoginForm />;

  return (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <BlockList />
    </div>
  );
};

export default App;
