import { Page } from '@playwright/test'

export class RegisterPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  get nameField() {
    return this.page.getByRole('textbox', { name: 'name' })
  }

  get emailField() {
    return this.page.getByRole('textbox', { name: 'email' })
  }

  get passwordField() {
    return this.page.getByRole('textbox', { name: 'password' })
  }

  get registerButton() {
    return this.page.getByRole('button', { name: 'Register' })
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'submit' })
  }
}
