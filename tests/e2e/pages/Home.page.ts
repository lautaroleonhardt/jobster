import { Page } from '@playwright/test'
import { BasePage } from './Base.page'

export class HomePage extends BasePage {
  readonly path = '/'

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    this.page.goto(this.path)
  }

  get registerButton() {
    return this.page.getByRole('link', { name: 'Login/Register' })
  }
}
