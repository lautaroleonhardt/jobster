import { User, UserProps } from '../../e2e/Entities/User'
import { RegisterUserDto } from '../../entities/auth'

export class RegisterPayloadBuilder {
  private registerUserDto: RegisterUserDto
  private user: User

  constructor(userProps?: UserProps) {
    this.user = new User(userProps)
    this.registerUserDto = {
      name: '',
      email: '',
      password: '',
    }
  }

  addName(name?: string): RegisterPayloadBuilder {
    this.registerUserDto.name = name || this.user.firstName
    return this
  }

  addEmail(email?: string): RegisterPayloadBuilder {
    this.registerUserDto.email = email || this.user.email
    return this
  }

  addPassword(password?: string): RegisterPayloadBuilder {
    this.registerUserDto.password = password || this.user.password
    return this
  }

  build(): RegisterUserDto {
    return this.registerUserDto
  }
}

export class ValidPayloadDto extends RegisterPayloadBuilder {
  constructor() {
    super()
    this.addEmail().addPassword().addName()
  }
}

export class InvalidPasswordPayloadDto extends RegisterPayloadBuilder {
  constructor() {
    super({ password: { length: 1 } })
    this.addEmail().addPassword().addName()
  }
}

export class InvalidEmailPayloadDto extends RegisterPayloadBuilder {
  constructor() {
    super()
    this.addEmail('user@').addPassword().addName()
  }
}
