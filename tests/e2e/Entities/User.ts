import { faker } from '@faker-js/faker'

type sex = 'male' | 'female'

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  sex: sex
  location: string
}

export class User implements User {
  constructor(sex?: sex) {
    this.firstName = faker.person.firstName(sex)
    this.lastName = faker.person.lastName()
    this.email = `${this.firstName}.${this.lastName}-${faker.number.int({ min: 0, max: 999999 })}@test.com`
    this.password = faker.internet.password({ length: 8, memorable: true })
    this.sex = sex || (faker.person.sex() as sex)
    this.location = faker.location.city()
  }
}
