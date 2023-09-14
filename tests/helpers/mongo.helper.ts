import { MongoClient, Db } from 'mongodb'
import { FilterQuery } from 'mongoose'

export class MongoHelper {
  private client: MongoClient
  private db: Db

  constructor(private dbName: string, uri?: string) {
    this.client = new MongoClient(uri || this.getBasicUri(dbName))
    this.db = this.client.db(dbName)
  }

  private getBasicUri(db: string): string {
    return process.env.MONGO_URI?.split(`/${db}`)[0] as string
  }

  async deleteOne(filter: FilterQuery<any>, collection: string) {
    try {
      await this.client.connect()
      const collectionRef = this.db.collection(collection)
      await collectionRef.deleteOne(filter)
    } catch (error) {
      throw new Error(`Cannot delete document in collection ${collection} due to: ${error}`)
    } finally {
      await this.client.close()
    }
  }

  async findOne(filter: FilterQuery<any>, collection: string) {
    try {
      await this.client.connect()
      const collectionRef = this.db.collection(collection)
      return await collectionRef.findOne(filter)
    } catch (error) {
      throw new Error(`Cannot find document in collection ${collection} due to: ${error}`)
    } finally {
      await this.client.close()
    }
  }
}
