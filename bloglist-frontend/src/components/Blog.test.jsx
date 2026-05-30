import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Blog } from "./Blog";
import { AuthContext } from "../context/authcontext";

const mockBlog = {
  id: "1",
  title: "Component testing is hard",
  author: "Test Author",
  url: "https://example.com/blog",
  likes: 7,
  user: { name: "Test User", username: "testuser" },
};

const renderBlog = (blog = mockBlog) => {
  const user = { username: "other", name: "Other User" };
  return render(
    <AuthContext.Provider value={{ user, login: vi.fn(), logout: vi.fn() }}>
      <Blog blog={blog} setBlogs={vi.fn()} />
    </AuthContext.Provider>,
  );
};

describe("Blog", () => {
  test("renders title and author but not url or likes by default", () => {
    renderBlog();

    expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
    expect(screen.getByText(mockBlog.author)).toBeInTheDocument();

    expect(screen.queryByText(mockBlog.url)).not.toBeInTheDocument();
    expect(screen.queryByText(`Likes ${mockBlog.likes}`)).not.toBeInTheDocument();
  });
});
