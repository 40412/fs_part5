import { useEffect } from "react";
import { getAll } from "../services/blogs";
import { Blog } from "./Blog";

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
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};
