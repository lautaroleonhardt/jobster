import { Page } from '@playwright/test'

export class Navbar {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  profileButton(firstName: string) {
    return this.page.getByRole('button', { name: firstName })
  }

  get logoutButton() {
    return this.page.getByRole('button', { name: 'logout' })
  }
}
