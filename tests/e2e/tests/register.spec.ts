import { expect } from '@playwright/test'
import { MongoHelper } from '../../helpers/mongo.helper'
import { UserActions } from '../actions/user.actions'
import { test } from '../playwright/test'
import { RegisterUserDto } from '../../entities/auth'
import { RegisterPayloadFactory } from '../../patterns/Factories/RegisterPayloadFactory'

test.describe('Register page', () => {
  let userActions: UserActions
  let registerPayload: RegisterUserDto
  const mongoHelper = new MongoHelper('jobster')

  test.beforeEach(async ({ page, homePage }) => {
    userActions = new UserActions(page)
    const registerPayloadFactory = new RegisterPayloadFactory()
    registerPayload = registerPayloadFactory.createPayload().build()

    await homePage.goto()
  })

  test.afterEach(async () => {
    await mongoHelper.deleteOne({ email: registerPayload.email }, 'users')
  })

  test('User can register successfully', async ({ homePage, loginPage, dashboardPage }) => {
    await homePage.loginRegisterButton.click()
    await loginPage.registerButton.click()
    await userActions.register(registerPayload)
    await expect(dashboardPage.alert).toHaveText(`Hello There ${registerPayload.name}`)
    await expect(dashboardPage.dashboardText).toBeVisible()
    const queryResult = await mongoHelper.findOne({ email: registerPayload.email }, 'users')
    expect(queryResult).toBeTruthy()
  })
})
