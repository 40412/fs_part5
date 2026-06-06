import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import { modify, remove } from "../services/blogs";

const Blog = ({ blogs, setBlogs }) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === id);

  useEffect(() => {
    const getLikes = () => {
      const blog = blogs.find((b) => b.id === id);
      setLikes(blog.likes);
    };
    getLikes();
  }, []);

  if (!blog) return null;

  const likeBlog = async (id) => {
    if (user) {
      await modify(id, { likes: 1 });
      setLikes(likes + 1);
    }
  };

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await remove(blog.id);
        setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id));
        navigate("/");
      } catch (e) {
        console.log("error removing blog", e);
      }
    }
  };

  const canRemove = user && blog.user && blog.user.username === user.username;

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {likes} likes{" "}
        {user && <button onClick={() => likeBlog(blog.id)}>like</button>}
      </p>
      <p>added by {blog.user?.name}</p>

      {canRemove && <button onClick={() => removeBlog(blog.id)}>remove</button>}
    </div>
  );
};

export default Blog;
