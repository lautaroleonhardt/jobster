import { expect } from '@playwright/test'
import { JobsterApi } from '../../helpers/jobsterApi.helper'
import { MongoHelper } from '../../helpers/mongo.helper'
import { RegisterUserDto } from '../../entities/auth'
import { RegisterPayloadBuilder } from '../../helpers/Builders/RegisterUserDtoBuilder'
import { UserActions } from '../actions/user.actions'
import { test } from '../playwright/test'

test.describe('Register page', () => {
  let userActions: UserActions
  let registerPayload: RegisterUserDto

  test.beforeEach(async ({ page, homePage }) => {
    userActions = new UserActions(page)
    registerPayload = new RegisterPayloadBuilder().addEmail().addPassword().addName().build()

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
