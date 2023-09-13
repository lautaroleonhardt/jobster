import { expect } from '@playwright/test'
import { MongoHelper } from '../../helpers/mongo.helper'
import { User } from '../Entities/User'
import { UserActions } from '../actions/user.actions'
import { test } from '../playwright/test'
import { RegisterUserDto } from '../../entities/auth'
import { RegisterPayloadBuilder } from '../../helpers/Builders/RegisterUserDtoBuilder'

test.describe('Register page', () => {
  let userActions: UserActions
  let registerPayload: RegisterUserDto
  const user = new User()

  test.beforeEach(async ({ page, homePage }) => {
    userActions = new UserActions(page)
    registerPayload = new RegisterPayloadBuilder().addEmail().addPassword().addName().build()

    await homePage.goto()
  })

  test.afterEach(async () => {
    const filter = { email: registerPayload.email }
    const mongoHelper = new MongoHelper('jobster')
    await mongoHelper.deleteOne(filter, 'users')
  })

  test('User can register successfully', async ({ homePage, loginPage, dashboardPage }) => {
    await homePage.loginRegisterButton.click()
    await loginPage.registerButton.click()
    await userActions.register(registerPayload)
    await expect(dashboardPage.alert).toHaveText(`Hello There ${registerPayload.name}`)
    await expect(dashboardPage.dashboardText).toBeVisible()
  })
})
