import { InvalidEmailPayload, InvalidPasswordPayload, ValidRegisterPayload } from '../../payloads/register-payloads'
import { RegisterPayloadBuilder } from '../Builders/RegisterUserDtoBuilder'

interface PayloadFactory {
  createPayload(): RegisterPayloadBuilder
}

export class RegisterPayloadFactory implements PayloadFactory {
  createPayload(): RegisterPayloadBuilder {
    return new ValidRegisterPayload()
  }
}

export class InvalidEmailPayloadFactory implements PayloadFactory {
  createPayload(): RegisterPayloadBuilder {
    return new InvalidEmailPayload()
  }
}

export class InvalidPasswordPayloadFactory implements PayloadFactory {
  createPayload(): RegisterPayloadBuilder {
    return new InvalidPasswordPayload()
  }
}
