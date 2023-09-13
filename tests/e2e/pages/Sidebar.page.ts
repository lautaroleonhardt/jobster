import { Page } from '@playwright/test'

export class Sidebar {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  get profileLink() {
    return this.page.getByRole('link', { name: 'profile' })
  }
}
