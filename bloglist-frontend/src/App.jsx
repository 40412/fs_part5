import { useEffect, useContext, useState } from "react";
import { LoginForm } from "./components/login";
import { AuthContext } from "./context/authcontext";
import { BlockList } from "./components/BlogList";
import LogoutButton from "./components/LogOutButton";
import BlogForm from "./components/BlogForm";
import { Notification } from "./components/Notifications";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Blog from "./components/BlogDetail";

const App = () => {
  const { user, login } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedUser = window.localStorage.getItem("loggedUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      login(parsed);
    }
  }, []);

  const showNotification = (text, type = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  /*  if (!user)
    return (
      <>
        <Notification message={notification} />
        <LoginForm showNotification={showNotification} />;
      </>
    ); */

  return (
    <Router>
      <Navigation />
      <Notification message={notification} />
      <Routes>
        <Route
          path="/login"
          element={<LoginForm showNotification={showNotification} />}
        />
        <Route
          path="/"
          element={<BlockList blogs={blogs} setBlogs={setBlogs} />}
        />
        <Route
          path="/blogs/:id"
          element={<Blog blogs={blogs} setBlogs={setBlogs} />}
        />
        <Route
          path="/new"
          element={
            <BlogForm setblogs={setBlogs} showNotification={showNotification} />
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
