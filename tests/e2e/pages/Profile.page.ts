import { Page } from '@playwright/test'
import { BasePage } from './Base.page'

export interface EditableFields {
  name?: string
  lastName?: string
  email?: string
  location?: string
}

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  get profileText() {
    return this.page.getByText('profile')
  }

  get nameField() {
    return this.page.locator('#name')
  }

  get lastNameField() {
    return this.page.locator('#lastName')
  }

  get emailField() {
    return this.page.locator('#email')
  }

  get locationField() {
    return this.page.locator('#location')
  }

  get saveChangesButton() {
    return this.page.getByRole('button', { name: 'save changes' })
  }

  get editableFields() {
    return [this.nameField, this.lastNameField, this.emailField, this.locationField]
  }

  async completeEditForm(editableFields: EditableFields) {
    const { name, lastName, email, location } = editableFields
    await this.editNameField(name)
    await this.editLastNameField(lastName)
    await this.editEmailField(email)
    await this.editLocationField(location)
  }

  async editNameField(name: string | undefined) {
    if (name === undefined) return
    await this.nameField.clear()
    await this.nameField.type(name)
  }

  async editLastNameField(lastName: string | undefined) {
    if (lastName === undefined) return
    await this.lastNameField.clear()
    await this.lastNameField.type(lastName)
  }

  async editEmailField(email: string | undefined) {
    if (email === undefined) return
    await this.emailField.clear()
    await this.emailField.type(email)
  }

  async editLocationField(location: string | undefined) {
    if (location === undefined) return
    await this.locationField.clear()
    await this.locationField.type(location)
  }
}
