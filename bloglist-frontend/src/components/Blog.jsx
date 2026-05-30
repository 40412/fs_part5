import { useContext, useState } from "react";
import { modify, remove } from "../services/blogs";
import { AuthContext } from "../context/authcontext";

export const Blog = ({ blog, setBlogs }) => {
  const { user } = useContext(AuthContext);
  const [viewDetails, setViewDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const like = async (id) => {
    await modify(id, { likes: 1 });
    setLikes(likes + 1);
  };

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await remove(blog.id);
        setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id));
      } catch (e) {
        console.log("error removing blog", e);
      }
    }
  };

  return (
    <>
      <div style={blogStyle}>
        {blog.title} | {blog.author}{" "}
        <button onClick={() => setViewDetails(!viewDetails)}>
          {viewDetails ? "Hide" : "View"}
        </button>
        {viewDetails && (
          <div>
            <div>{blog.url}</div>
            <div>
              Likes {likes} <button onClick={() => like(blog.id)}>Like</button>
            </div>

            <div>{blog.user.name}</div>
            {blog.user.username === user.username && (
              <button style={{ backgroundColor: "red" }} onClick={removeBlog}>
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
