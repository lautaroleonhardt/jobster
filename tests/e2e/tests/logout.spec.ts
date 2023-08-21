import { expect, test } from '@playwright/test'
import { UserActions } from '../actions/user.actions'
import { HomePage } from '../pages/home.page'
import { validUser } from '../data/users.data'
import { Navbar } from '../pages/Navbar.page'

test.describe('Register page', () => {
  let homePage: HomePage
  let navbar: Navbar
  let userActions: UserActions

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    navbar = new Navbar(page)
    userActions = new UserActions(page)
    const { email, password } = validUser

    await homePage.goto()
    await userActions.login(email, password)
    await homePage.closeAlertButton.click()
  })

  test('User can logout successfully', async ({ page }) => {
    const { firstName } = validUser
    await navbar.profileButton(firstName).click()
    await navbar.logoutButton.click()
    await expect.soft(homePage.alert).toBeVisible()
    await expect.soft(homePage.alert).toHaveText('Logging out...')
    expect(page.url()).toContain('/landing')
  })
})
