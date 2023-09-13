import { JobsterApi } from './jobsterApi.helper'

export const generateToken = async (email: string, password: string): Promise<string> => {
  const { token } = await JobsterApi.loginUser({ email, password })
  return token
}
