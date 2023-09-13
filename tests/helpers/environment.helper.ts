import dotenv from 'dotenv'
import path from 'path'

export class EnvironmentHelper {
  private static environment = process.env.NODE_ENV || 'local'

  static get baseURL() {
    dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${this.environment}`) })
    const baseURL = this.environment === 'local' ? `${process.env.BASE_URL}:${process.env.PORT}` : process.env.BASE_URL
    return baseURL
  }
}
