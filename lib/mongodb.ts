import { MongoClient, type Db } from 'mongodb'

const url = process.env.DATABASE_URL
if (!url) {
  throw new Error('DATABASE_URL is required. Add it to .env.local.')
}

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient
  _mongoClientPromise?: Promise<MongoClient>
}

const mongoClient = globalWithMongo._mongoClient ?? new MongoClient(url, {
  maxPoolSize: 10,
})

const mongoClientPromise = globalWithMongo._mongoClientPromise ?? mongoClient.connect()

if (process.env.NODE_ENV !== 'production') {
  globalWithMongo._mongoClient = mongoClient
  globalWithMongo._mongoClientPromise = mongoClientPromise
}

export async function getMongoClient(): Promise<MongoClient> {
  return mongoClientPromise
}

export async function getMongoDatabase(databaseName?: string): Promise<Db> {
  const client = await getMongoClient()
  return databaseName ? client.db(databaseName) : client.db()
}
