import { useState } from "react";
import { modify } from "../services/blogs";

export const Blog = ({ blog }) => {
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
          </div>
        )}
      </div>
    </>
  );
};
