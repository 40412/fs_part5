import { useState } from "react";
import { create } from "../services/blogs";

const BlogForm = ({ setblogs, showNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //onCreate({ title, author, url });
    const newBlog = { title: title, author: author, url: url };

    try {
      const result = await create(newBlog);
      setblogs((blogs) => [...blogs, result]);
      showNotification(
        `New Blog, ${result.title} by ${result.author} created!`,
        "success",
      );
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
