import { useState } from "react";
import { create } from "../services/blogs";

const BlogForm = ({ setblogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //onCreate({ title, author, url });
    const newBlog = { title: title, author: author, url: url };
    const result = await create(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
    setblogs((blogs) => [...blogs, result]);
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
