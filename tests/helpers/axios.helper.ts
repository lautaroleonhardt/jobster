import axios from 'axios'
import { EnvironmentHelper } from './environment.helper'

export const axiosInstance = axios.create({
  baseURL: `${EnvironmentHelper.baseURL}/api/v1`,
})
