import { Page } from '@playwright/test'
import { BasePage } from './Base.page'

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  get dashboardText() {
    return this.page.getByText('Dashboard')
  }
}
