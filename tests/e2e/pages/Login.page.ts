import { Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  get emailField() {
    return this.page.getByRole('textbox', { name: 'email' })
  }

  get passwordField() {
    return this.page.getByRole('textbox', { name: 'password' })
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'submit' })
  }

  get loginText() {
    return this.page.getByText('Login')
  }

  get registerButton() {
    return this.page.getByRole('button', { name: 'Register' })
  }
}
