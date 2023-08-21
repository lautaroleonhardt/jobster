import { Page } from '@playwright/test'

export class BasePage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  get alert() {
    return this.page.getByRole('alert')
  }

  get closeAlertButton() {
    return this.page.locator('[aria-label="close"]')
  }
}
