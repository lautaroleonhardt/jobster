export interface RegisterUserDto {
  email: string
  name: string
  password: string
}

export interface LoginUserDto {
  email: string
  password: string
}

export interface UserDto {
  email: string
  lastName: string
  location: string
  name: string
  token: string
}
