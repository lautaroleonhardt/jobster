import { test as base } from '@playwright/test'
import { DashboardPage, HomePage, LoginPage, Navbar, ProfilePage, RegisterPage } from '../pages'
import { Sidebar } from '../pages/Sidebar.page'

type MyFixtures = {
  dashboardPage: DashboardPage
  homePage: HomePage
  loginPage: LoginPage
  navbar: Navbar
  profilePage: ProfilePage
  registerPage: RegisterPage
  sidebar: Sidebar
}

export const test = base.extend<MyFixtures>({
  dashboardPage: async ({ page }, use) => await use(new DashboardPage(page)),
  homePage: async ({ page }, use) => await use(new HomePage(page)),
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  navbar: async ({ page }, use) => await use(new Navbar(page)),
  profilePage: async ({ page }, use) => await use(new ProfilePage(page)),
  registerPage: async ({ page }, use) => await use(new RegisterPage(page)),
  sidebar: async ({ page }, use) => await use(new Sidebar(page)),
})
