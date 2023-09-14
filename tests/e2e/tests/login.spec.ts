import { expect } from '@playwright/test'
import { JobsterApi } from '../../helpers/jobsterApi.helper'
import { MongoHelper } from '../../helpers/mongo.helper'
import { RegisterUserDto } from '../../entities/auth'
import { UserActions } from '../actions/user.actions'
import { test } from '../playwright/test'
import { RegisterPayloadFactory } from '../../patterns/Factories/RegisterPayloadFactory'

test.describe('Login Page', () => {
  let userActions: UserActions
  let registerPayload: RegisterUserDto

  test.beforeEach(async ({ homePage, page }) => {
    userActions = new UserActions(page)
    const registerPayloadFactory = new RegisterPayloadFactory()
    registerPayload = registerPayloadFactory.createPayload().build()

    await JobsterApi.registerUser(registerPayload)
    await homePage.goto()
  })

  test.afterEach(async () => {
    const filter = { email: registerPayload.email }
    const mongoHelper = new MongoHelper('jobster')
    await mongoHelper.deleteOne(filter, 'users')
  })

  test('User logs in successfully', async ({ homePage, dashboardPage }) => {
    const { email, password, name } = registerPayload
    await userActions.login(email, password)
    await expect(homePage.alert).toHaveText(`Welcome Back ${name}`)
    await expect(dashboardPage.dashboardText).toBeVisible()
  })

  test('User should not login by not entering email', async ({ loginPage, homePage }) => {
    const { password } = registerPayload
    await userActions.login('', password)
    await expect(homePage.alert).toHaveText('Please fill out all fields')
    await expect(loginPage.loginText).toBeVisible()
  })

  test('User should not login by not entering password', async ({ loginPage, homePage }) => {
    const { email } = registerPayload
    await userActions.login(email, '')
    await expect(homePage.alert).toHaveText('Please fill out all fields')
    await expect(loginPage.loginText).toBeVisible()
  })

  test('User should not login by entering invalid email', async ({ loginPage, homePage }) => {
    const { email, password } = registerPayload
    const invalidEmail = `!${email}`
    await userActions.login(invalidEmail, password)
    await expect(homePage.alert).toHaveText('Invalid Credentials')
    await expect(loginPage.loginText).toBeVisible()
  })

  test('User should not login by entering invalid password', async ({ loginPage, homePage }) => {
    const { email, password } = registerPayload
    const invalidPassword = `!${password}`
    await userActions.login(email, invalidPassword)
    await expect(homePage.alert).toHaveText('Invalid Credentials')
    await expect(loginPage.loginText).toBeVisible()
  })
})
