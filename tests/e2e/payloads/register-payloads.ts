import { RegisterPayloadBuilder } from '../patterns/Builders/RegisterUserDtoBuilder'

export class ValidRegisterPayload extends RegisterPayloadBuilder {
  constructor() {
    super()
    this.addEmail().addPassword().addName()
  }
}

export class InvalidPasswordPayload extends RegisterPayloadBuilder {
  constructor() {
    super({ password: { length: 1 } })
    this.addEmail().addPassword().addName()
  }
}

export class InvalidEmailPayload extends RegisterPayloadBuilder {
  constructor() {
    super()
    this.addEmail('user@').addPassword().addName()
  }
}
