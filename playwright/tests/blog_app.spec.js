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
})
