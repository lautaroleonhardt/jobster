import { MongoClient } from 'mongodb'
import { FilterQuery } from 'mongoose'

export class MongoHelper {
  private client: MongoClient

  constructor(private db: string, uri?: string) {
    this.client = new MongoClient(uri || this.getBasicUri(db))
  }

  private getBasicUri(db: string): string {
    return process.env.MONGO_URI?.split(`/${db}`)[0] as string
  }

  async deleteOne(filter: FilterQuery<any>, collection: string) {
    try {
      await this.client.connect()
      const db = this.client.db(this.db)
      const collectionRef = db.collection(collection)
      await collectionRef.deleteOne(filter)
    } catch (error) {
      throw new Error(`Cannot delete document in collection ${collection} due to: ${error}`)
    } finally {
      await this.client.close()
    }
  }
}
