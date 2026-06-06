import { useEffect } from "react";
import { getAll } from "../services/blogs";
import { Link } from "react-router-dom";

export const BlockList = ({ blogs, setBlogs }) => {
  useEffect(() => {
    const getBlocks = async () => {
      const bloglist = await getAll();
      setBlogs(bloglist);
    };
    getBlocks();
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} | {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
};
