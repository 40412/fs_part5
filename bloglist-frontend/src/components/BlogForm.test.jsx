import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { afterEach, describe, test, expect, vi } from "vitest";
import BlogForm from "./BlogForm";

vi.mock("../services/blogs", () => ({
  create: vi.fn(() =>
    Promise.resolve({
      id: "123",
      title: "Test Title",
      author: "Test Author",
      url: "https://test.com",
      likes: 0,
      user: { name: "Test User", username: "testuser" },
    }),
  ),
}));

const renderBlogForm = ({ onCreate = vi.fn() } = {}) => {
  return render(
    <BlogForm
      setblogs={vi.fn()}
      showNotification={vi.fn()}
      setFormVisible={vi.fn()}
      onCreate={onCreate}
    />,
  );
};

describe("BlogForm", () => {
  afterEach(() => {
    cleanup();
  });

  test("calls onCreate with the right details when a new blog is created", async () => {
    const onCreate = vi.fn();
    renderBlogForm({ onCreate });

    const [titleInput, authorInput, urlInput] = screen.getAllByRole("textbox");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(urlInput, { target: { value: "https://test.com" } });

    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalledWith({
        title: "Test Title",
        author: "Test Author",
        url: "https://test.com",
      });
    });
  });
});
