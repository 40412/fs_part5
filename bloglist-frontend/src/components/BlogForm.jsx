import { useState } from "react";
import { create } from "../services/blogs";
import { useNavigate } from "react-router-dom";

const BlogForm = ({ setblogs, showNotification, onCreate = () => {} }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { title, author, url };

    try {
      onCreate(newBlog);
      const result = await create(newBlog);
      setblogs((blogs) => [...blogs, result]);
      showNotification(
        `New Blog, ${result.title} by ${result.author} created!`,
        "success",
      );
      navigate("/");
    } catch (e) {
      showNotification(e.message, "error");
    }

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new</h3>

      <div>
        title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        author:
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>

      <div>
        url:
        <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>

      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
