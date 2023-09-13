import { Page } from '@playwright/test'
import { RegisterPage, LoginPage, HomePage, Navbar } from '../pages'
import { User } from '../Entities/User'
import { RegisterUserDto } from '../../entities/auth'

export class UserActions {
  readonly page: Page
  readonly homePage: HomePage
  readonly loginPage: LoginPage
  readonly registerPage: RegisterPage
  readonly navbar: Navbar

  constructor(page: Page) {
    this.page = page
    this.homePage = new HomePage(page)
    this.loginPage = new LoginPage(page)
    this.registerPage = new RegisterPage(page)
    this.navbar = new Navbar(page)
  }

  async login(email: string, password: string) {
    await this.homePage.loginRegisterButton.click()
    await this.loginPage.emailField.type(email)
    await this.loginPage.passwordField.type(password)
    await this.loginPage.submitButton.click()
  }

  async register(user: RegisterUserDto) {
    await this.registerPage.nameField.type(user.name)
    await this.registerPage.emailField.type(user.email)
    await this.registerPage.passwordField.type(user.password)
    await this.registerPage.submitButton.click()
  }

  async logout(firstName: string) {
    await this.navbar.profileButton(firstName).click()
    await this.navbar.logoutButton.click()
    await this.homePage.alert.waitFor({ state: 'visible' })
  }
}
