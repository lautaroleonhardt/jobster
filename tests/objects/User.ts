import { faker } from '@faker-js/faker'

type sex = 'male' | 'female' | undefined

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  sex: sex
  location: string
}

export interface UserProps {
  sex?: 'male' | 'female' | undefined
  password?: PasswordOptions
  firstName?: sex
  lastName?: sex
  email?: EmailOptions
}

interface PasswordOptions {
  length?: number
  memorable?: boolean
  pattern?: RegExp
  prefix?: string
}

interface EmailOptions {
  firstName: string
  lastName: string
  provider: string
  allowSpecialCharacters: boolean
}

export class User implements User {
  constructor(userProps?: UserProps) {
    this.firstName = faker.person.firstName(userProps?.sex)
    this.lastName = faker.person.lastName(userProps?.lastName)
    this.email = faker.internet.email(userProps?.email)
    this.password = faker.internet.password(userProps?.password)
    this.sex = userProps?.sex || (faker.person.sex() as sex)
    this.location = faker.location.city()
  }
}
