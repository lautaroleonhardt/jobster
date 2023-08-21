import { expect, test } from '@playwright/test'
import { LoginPage } from '../pages/Login.page'
import { UserActions } from '../actions/user.actions'
import { HomePage } from '../pages/home.page'
import { User } from '../Entities/User'
import { DashboardPage } from '../pages/Dashboard.page'

test.describe('Register page', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let dashboardPage: DashboardPage
  let userActions: UserActions

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    dashboardPage = new DashboardPage(page)
    userActions = new UserActions(page)
    await homePage.goto()
  })

  test('User can register successfully', async () => {
    const user = new User('male')
    await homePage.registerButton.click()
    await loginPage.registerButton.click()
    await userActions.register(user)
    await expect.soft(dashboardPage.alert).toBeVisible()
    await expect.soft(dashboardPage.alert).toHaveText(`Hello There ${user.firstName}`)
    await expect(dashboardPage.dashboardText).toBeVisible()
  })
})
