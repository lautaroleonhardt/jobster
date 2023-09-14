import { expect } from '@playwright/test'
import { JobsterApi } from '../../helpers/jobsterApi.helper'
import { MongoHelper } from '../../helpers/mongo.helper'
import { RegisterUserDto } from '../../entities/auth'
import { UserActions } from '../actions/user.actions'
import { test } from '../playwright/test'
import { RegisterPayloadFactory } from '../patterns/Factories/RegisterPayloadFactory'

test.describe('Register page', () => {
  let userActions: UserActions
  let registerPayload: RegisterUserDto

  test.beforeEach(async ({ page, homePage }) => {
    userActions = new UserActions(page)
    const registerPayloadFactory = new RegisterPayloadFactory()
    registerPayload = registerPayloadFactory.createPayload().build()

    await JobsterApi.registerUser(registerPayload)
    await homePage.goto()
    await userActions.login(registerPayload.email, registerPayload.password)
    await homePage.closeAlertButton.click()
  })

  test.afterEach(async () => {
    const filter = { email: registerPayload.email }
    const mongoHelper = new MongoHelper('jobster')
    await mongoHelper.deleteOne(filter, 'users')
  })

  test('User can logout successfully', async ({ page, navbar, homePage }) => {
    const { name } = registerPayload
    await navbar.profileButton(name).click()
    await navbar.logoutButton.click()
    await expect(homePage.alert).toHaveText('Logging out...')
    expect(page.url()).toContain('/landing')
  })
})
