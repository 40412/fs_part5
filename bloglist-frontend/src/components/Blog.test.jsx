import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, test, expect, vi } from "vitest";
import { Blog } from "./Blog";
import { AuthContext } from "../context/authcontext";

vi.mock("../services/blogs", () => ({
  modify: vi.fn(() => Promise.resolve(200)),
  remove: vi.fn(() => Promise.resolve()),
}));

const mockBlog = {
  id: "1",
  title: "Component testing is hard",
  author: "Test Author",
  url: "https://example.com/blog",
  likes: 7,
  user: { name: "Test User", username: "testuser" },
};

const renderBlog = ({ blog = mockBlog, likeBlog = vi.fn() } = {}) => {
  const user = { username: "other", name: "Other User" };
  return render(
    <AuthContext.Provider value={{ user, login: vi.fn(), logout: vi.fn() }}>
      <Blog blog={blog} setBlogs={vi.fn()} likeBlog={likeBlog} />
    </AuthContext.Provider>,
  );
};

describe("Blog", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders title and author but not url or likes by default", () => {
    renderBlog();

    expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
    expect(screen.getByText(mockBlog.author)).toBeInTheDocument();

    expect(screen.queryByText(mockBlog.url)).not.toBeInTheDocument();
    expect(screen.queryByText(`Likes ${mockBlog.likes}`)).not.toBeInTheDocument();
  });

  test("shows url and likes when view details button is clicked", () => {
    renderBlog();

    fireEvent.click(screen.getByRole("button", { name: "View" }));

    expect(screen.getByText(mockBlog.url)).toBeInTheDocument();
    expect(screen.getByText(`Likes ${mockBlog.likes}`)).toBeInTheDocument();
  });

  test("calls likeBlog prop twice when like button is clicked twice", () => {
    const likeBlog = vi.fn();
    renderBlog({ likeBlog });

    fireEvent.click(screen.getByRole("button", { name: "View" }));
    const likeButton = screen.getByRole("button", { name: "Like" });
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likeBlog).toHaveBeenCalledTimes(2);
    expect(likeBlog).toHaveBeenCalledWith(mockBlog.id);
  });
});
