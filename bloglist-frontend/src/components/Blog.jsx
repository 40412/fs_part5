import { useContext, useState } from "react";
import { modify, remove } from "../services/blogs";
import { AuthContext } from "../context/authcontext";

export const Blog = ({ blog, setBlogs, likeBlog = () => {} }) => {
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
    likeBlog(id);
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
      <div style={blogStyle} className="blog">
        <span className="blog-title">{blog.title}</span>
        {" | "}
        <span className="blog-author">{blog.author}</span>{" "}
        <button onClick={() => setViewDetails(!viewDetails)}>
          {viewDetails ? "Hide" : "View"}
        </button>
        {/* {viewDetails && (
          <div className="blog-details">
            <div className="blog-url">{blog.url}</div>
            <div className="blog-likes">
              Likes {likes} <button onClick={() => like(blog.id)}>Like</button>
            </div>

            <div className="blog-user">{blog.user.name}</div>
            {blog.user.username === user.username && (
              <button style={{ backgroundColor: "red" }} onClick={removeBlog}>
                Remove
              </button>
            )}
          </div>
        )} */}
      </div>
    </>
  );
};
