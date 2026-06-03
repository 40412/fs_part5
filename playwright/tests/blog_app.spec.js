const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password123',
      },
    })
    await page.goto('http://localhost:5173')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByText('username').locator('input').fill('testuser')
      await page.getByText('password').locator('input').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByText('username').locator('input').fill('testuser')
      await page.getByText('password').locator('input').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.locator('.error')).toContainText('Wrong credentials')
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByText('username').locator('input').fill('testuser')
      await page.getByText('password').locator('input').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.getByText('title:').locator('input').fill('A Test Blog')
      await page.getByText('author:').locator('input').fill('Test Author')
      await page.getByText('url:').locator('input').fill('https://test.com')

      await page.getByRole('button', { name: 'create', exact: true }).click()

      const blog = page.locator('.blog').filter({ hasText: 'A Test Blog' }).first()
      await expect(blog.locator('.blog-title')).toHaveText('A Test Blog')
      await expect(blog.locator('.blog-author')).toHaveText('Test Author')
    })
  })
})
