import { expect, test } from '@playwright/test'
import { HomePage } from '../pages/home.page'
import { UserActions } from '../actions/user.actions'
import { validUser } from '../data/users.data'
import { LoginPage } from '../pages/Login.page'
import { DashboardPage } from '../pages/Dashboard.page'

test.describe('Login Page', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let dashboardPage: DashboardPage
  let userActions: UserActions

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    userActions = new UserActions(page)
    await homePage.goto()
  })

  test('User logs in successfully', async () => {
    const { email, password, firstName } = validUser
    await userActions.login(email, password)
    await expect.soft(homePage.alert).toBeVisible()
    await expect.soft(homePage.alert).toHaveText(`Welcome Back ${firstName}`)
    await expect(dashboardPage.dashboardText).toBeVisible()
  })

  test('User should not login by not entering email', async () => {
    const { password } = validUser
    await userActions.login('', password)
    await expect.soft(homePage.alert).toBeVisible()
    await expect.soft(homePage.alert).toHaveText('Please fill out all fields')
    await expect(loginPage.loginText).toBeVisible()
  })

  test('User should not login by not entering password', async () => {
    const { email } = validUser
    await userActions.login(email, '')
    await expect.soft(homePage.alert).toBeVisible()
    await expect.soft(homePage.alert).toHaveText('Please fill out all fields')
    await expect(loginPage.loginText).toBeVisible()
  })

  test('User should not login by entering invalid email', async () => {
    const { email, password } = validUser
    const invalidEmail = `!${email}`
    await userActions.login(invalidEmail, password)
    await expect.soft(homePage.alert).toBeVisible()
    await expect.soft(homePage.alert).toHaveText('Invalid Credentials')
    await expect(loginPage.loginText).toBeVisible()
  })

  test('User should not login by entering invalid password', async () => {
    const { email, password } = validUser
    const invalidPassword = `!${password}`
    await userActions.login(email, invalidPassword)
    await expect.soft(homePage.alert).toBeVisible()
    await expect.soft(homePage.alert).toHaveText('Invalid Credentials')
    await expect(loginPage.loginText).toBeVisible()
  })
})
