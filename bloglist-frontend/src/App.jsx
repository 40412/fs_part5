import { useEffect, useContext, useState } from "react";
import { LoginForm } from "./components/login";
import { AuthContext } from "./context/authcontext";
import { BlockList } from "./components/BlogList";
import LogoutButton from "./components/LogOutButton";
import BlogForm from "./components/BlogForm";

const App = () => {
  const { user, login } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

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
      <LogoutButton />
      <div>
        <BlogForm setblogs={setBlogs} />
      </div>
      <BlockList blogs={blogs} setBlogs={setBlogs} />
    </div>
  );
};

export default App;
