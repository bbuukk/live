import { readJsonFile } from '#src/__tests__/utils/readJson.js'
import mongoose from 'mongoose'

import category from '#src/models/category.model.js'
import Product from '#src/models/product.model.js'
import User from '#src/models/user.model.js'

import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer

export async function setupDB() {
  await connect()
  await clearDatabase()
  await populateWithTestData()
}

export async function teardownDB() {
  await disconnect()
}

async function connect() {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri('test')
  await mongoose.connect(mongoUri)
}

async function populateWithTestData() {
  let categories = readJsonFile(
    'src/__tests__/in_memory_db/data/categories.json',
  )
  const products = readJsonFile('src/__tests__/in_memory_db/data/products.json')
  const users = readJsonFile('src/__tests__/in_memory_db/data/users.json')
  await category.insertMany(categories)
  await Product.insertMany(products)
  await User.insertMany(users)
}

async function clearDatabase() {
  await mongoose.connection.db.dropDatabase()
}

async function disconnect() {
  await mongoose.disconnect()
  await mongoServer.stop()
}
