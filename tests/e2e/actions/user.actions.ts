import { Page } from '@playwright/test'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/Login.page'
import { User } from '../Entities/User'
import { RegisterPage } from '../pages/Register.page'

export class UserActions {
  readonly page: Page
  readonly homePage: HomePage
  readonly loginPage: LoginPage
  readonly registerPage: RegisterPage

  constructor(page: Page) {
    this.page = page
    this.homePage = new HomePage(page)
    this.loginPage = new LoginPage(page)
    this.registerPage = new RegisterPage(page)
  }

  async login(email: string, password: string) {
    await this.homePage.registerButton.click()
    await this.loginPage.emailField.type(email)
    await this.loginPage.passwordField.type(password)
    await this.loginPage.submitButton.click()
  }

  async register(user: User) {
    await this.registerPage.nameField.type(user.firstName)
    await this.registerPage.emailField.type(user.email)
    await this.registerPage.passwordField.type(user.password)
    await this.registerPage.submitButton.click()
  }
}
