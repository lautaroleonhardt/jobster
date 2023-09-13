import { LoginUserDto, RegisterUserDto, UserDto } from '../entities/auth'
import { axiosInstance } from './axios.helper'

export class JobsterApi {
  static async loginUser(payload: LoginUserDto): Promise<UserDto> {
    return await axiosInstance.post('/auth/login', payload)
  }

  static async registerUser(payload: RegisterUserDto) {
    return await axiosInstance.post('/auth/register', payload)
  }
}
