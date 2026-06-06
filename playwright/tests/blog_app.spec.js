const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Test User",
        username: "testuser",
        password: "password123",
      },
    });
    await page.goto("http://localhost:5173");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByText("username").locator("input").fill("testuser");
      await page.getByText("password").locator("input").fill("password123");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByText("username").locator("input").fill("testuser");
      await page.getByText("password").locator("input").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.locator(".error")).toContainText("Wrong credentials");
      await expect(page.getByText("Test User logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByText("username").locator("input").fill("testuser");
      await page.getByText("password").locator("input").fill("password123");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();

      await page.getByText("title:").locator("input").fill("A Test Blog");
      await page.getByText("author:").locator("input").fill("Test Author");
      await page.getByText("url:").locator("input").fill("https://test.com");

      await page.getByRole("button", { name: "create", exact: true }).click();

      await page.waitForTimeout(200);

      const blog = page
        .locator(".blog")
        .filter({ hasText: "A Test Blog" })
        .first();
      await expect(blog.locator(".blog-title")).toHaveText("A Test Blog");
      await expect(blog.locator(".blog-author")).toHaveText("Test Author");
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByText("title:").locator("input").fill("An Awesome Blog");
      await page.getByText("author:").locator("input").fill("Best Author");
      await page.getByText("url:").locator("input").fill("https://test.com");

      await page.getByRole("button", { name: "create", exact: true }).click();
      await page.reload();

      const blog = page.locator(".blog", { hasText: "An Awesome Blog" });
      await blog.getByRole("button", { name: "View" }).click();
      await blog.getByRole("button", { name: "Like" }).click();

      await expect(blog.locator(".blog-likes")).toHaveText(/Likes 1/);
    });

    test("a blog can be deleted", async ({ page }) => {
      page.on("dialog", (dialog) => dialog.accept());

      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByText("title:").locator("input").fill("Deletable Blog");
      await page.getByText("author:").locator("input").fill("Test Author");
      await page.getByText("url:").locator("input").fill("https://test.com");
      await page.getByRole("button", { name: "create", exact: true }).click();

      await page.reload();

      const blog = page.locator(".blog", { hasText: "Deletable Blog" });

      await blog.getByRole("button", { name: "View" }).click();

      await blog.getByRole("button", { name: "Remove" }).click();
      await expect(blog).toHaveCount(0);
    });

    test("only the creator can see the remove button", async ({
      page,
      request,
    }) => {
      await page.getByRole("button", { name: "logout" }).click();
      await request.post("http://localhost:3003/api/testing/reset");
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Creator User",
          username: "creator",
          password: "password123",
        },
      });

      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Other User",
          username: "otheruser",
          password: "password123",
        },
      });

      // LOGIN AS CREATOR
      await page.getByText("username").locator("input").fill("creator");
      await page.getByText("password").locator("input").fill("password123");
      await page.getByRole("button", { name: "login" }).click();

      // Create a blog
      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByText("title:").locator("input").fill("Creator Blog");
      await page.getByText("author:").locator("input").fill("Author");
      await page.getByText("url:").locator("input").fill("https://example.com");
      await page.getByRole("button", { name: "create", exact: true }).click();

      await page.reload();

      const blog = page.locator(".blog", { hasText: "Creator Blog" });

      await blog.getByRole("button", { name: "View" }).click();

      // Creator should see remove button
      await expect(blog.getByRole("button", { name: "Remove" })).toBeVisible();

      // LOG OUT
      await page.getByRole("button", { name: "logout" }).click();

      // LOGIN AS OTHER USER
      await page.getByText("username").locator("input").fill("otheruser");
      await page.getByText("password").locator("input").fill("password123");
      await page.getByRole("button", { name: "login" }).click();

      await page.waitForTimeout(1000);

      const blogAsOther = page.locator(".blog", { hasText: "Creator Blog" });
      await blogAsOther.getByRole("button", { name: "View" }).click();

      await expect(
        blogAsOther.getByRole("button", { name: "Remove" }),
      ).toHaveCount(0);
    });

    test("blogs are ordered by likes", async ({ page }) => {
      const createBlog = async (title) => {
        await page.getByRole("button", { name: "Create new blog" }).click();
        await page.getByText("title:").locator("input").fill(title);
        await page.getByText("author:").locator("input").fill("Author");
        await page
          .getByText("url:")
          .locator("input")
          .fill("https://example.com");
        await page.getByRole("button", { name: "create", exact: true }).click();
        await page.reload();
      };

      await createBlog("Blog A");
      await createBlog("Blog B");
      await createBlog("Blog C");

      const likeBlog = async (title, times) => {
        const blog = page.locator(".blog", { hasText: title });
        page.waitForTimeout(1000);
        await blog.getByRole("button", { name: "View" }).click();
        const likeButton = blog.getByRole("button", { name: "Like" });
        for (let i = 0; i < times; i++) {
          await likeButton.click();
          await page.waitForTimeout(1000);
        }
      };
      await likeBlog("Blog A", 1);
      await likeBlog("Blog B", 5);
      await likeBlog("Blog C", 3);

      await page.reload();

      const blogs = page.locator(".blog");

      const first = await blogs.nth(0).innerText();
      const second = await blogs.nth(1).innerText();
      const third = await blogs.nth(2).innerText();

      expect(first).toContain("Blog B");
      expect(second).toContain("Blog C");
      expect(third).toContain("Blog A");
    });
  });
});
