import { useState } from "react";

export const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
              {blog.likes} <button>Like</button>
            </div>

            <div>{blog.user.name}</div>
          </div>
        )}
      </div>
    </>
  );
};
