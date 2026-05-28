import getAll from "../services/blogs";
import { Blog } from "./Blog";
import { useState, useEffect } from "react";

export const BlockList = () => {
  const [blogs, setBlogs] = useState([]);

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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
