import { useEffect, useContext, useState } from "react";
import { LoginForm } from "./components/login";
import { AuthContext } from "./context/authcontext";
import { BlockList } from "./components/BlogList";
import LogoutButton from "./components/LogOutButton";
import BlogForm from "./components/BlogForm";
import { Notification } from "./components/Notifications";

const App = () => {
  const { user, login } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

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

  if (!user)
    return (
      <>
        <Notification message={notification} />
        <LoginForm showNotification={showNotification} />;
      </>
    );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification} />
      <p>{user.name} logged in</p>
      <LogoutButton />
      <button onClick={() => setBlogFormVisible(true)}>Create new blog</button>
      {blogFormVisible && (
        <div>
          <BlogForm
            setblogs={setBlogs}
            showNotification={showNotification}
            setFormVisible={setBlogFormVisible}
          />
          <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
        </div>
      )}

      <BlockList blogs={blogs} setBlogs={setBlogs} />
    </div>
  );
};

export default App;
