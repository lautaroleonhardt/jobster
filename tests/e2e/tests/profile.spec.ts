import { expect } from '@playwright/test'
import { JobsterApi } from '../../helpers/jobsterApi.helper'
import { MongoHelper } from '../../helpers/mongo.helper'
import { RegisterUserDto } from '../../entities/auth'
import { User } from '../Entities/User'
import { UserActions } from '../actions/user.actions'
import { test } from '../playwright/test'
import type { EditableFields } from '../pages'
import { RegisterPayloadBuilder } from '../../helpers/Builders/RegisterUserDtoBuilder'

test.describe('Profile page', () => {
  let userActions: UserActions
  let registerPayload: RegisterUserDto
  let userEmail: string

  test.beforeEach(async ({ page, homePage }) => {
    userActions = new UserActions(page)

    registerPayload = new RegisterPayloadBuilder().addEmail().addPassword().addName().build()
    await JobsterApi.registerUser(registerPayload)
    await homePage.goto()
    await userActions.login(registerPayload.email, registerPayload.password)
    await homePage.closeAlertButton.click()
  })

  test.afterEach(async ({}, testInfo) => {
    const filter = { email: userEmail }
    const mongoHelper = new MongoHelper('jobster')
    await mongoHelper.deleteOne(filter, 'users')
  })

  test('User can edit all the fields', async ({ page, sidebar, profilePage }) => {
    const { firstName, lastName, email, location } = new User()
    const editableFields: EditableFields = { name: firstName, lastName, email, location }
    userEmail = email

    await sidebar.profileLink.click()
    expect(page.url()).toContain('/profile')
    await profilePage.completeEditForm(editableFields)
    await profilePage.saveChangesButton.click()
    await expect(profilePage.alert).toHaveText('User Updated!')
    expect(await profilePage.nameField.inputValue()).toEqual(firstName)
    expect(await profilePage.lastNameField.inputValue()).toEqual(lastName)
    expect(await profilePage.emailField.inputValue()).toEqual(email)
    expect(await profilePage.locationField.inputValue()).toEqual(location)
  })

  test('User can log in after updating the email', async ({ sidebar, profilePage, homePage, dashboardPage }) => {
    const updatedUser = new User()
    userEmail = updatedUser.email

    await sidebar.profileLink.click()
    await profilePage.completeEditForm({ email: updatedUser.email })
    await profilePage.saveChangesButton.click()
    await homePage.closeAlertButton.click()
    await userActions.logout(registerPayload.name)
    await homePage.alert.waitFor({ state: 'hidden' })
    await userActions.login(updatedUser.email, registerPayload.password)
    await expect.soft(homePage.alert).toHaveText(`Welcome Back ${registerPayload.name}`)
    await expect(dashboardPage.dashboardText).toBeVisible()
  })

  test.skip('User is not able to save changes if no field was updated', async ({ sidebar, profilePage }) => {
    userEmail = registerPayload.email
    await sidebar.profileLink.click()
    expect(await profilePage.saveChangesButton.isDisabled()).toBe(true)
  })
})
