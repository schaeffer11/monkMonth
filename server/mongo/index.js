import { MongoClient } from 'mongodb'
import '../dotenv'

const {
  DATABASE_NAME,
  MONGO_PASSWORD,
  MONGO_USER,
  MONGO_REPLICA_SET,
  MONGO_SHARD_0,
  MONGO_SHARD_1,
  MONGO_SHARD_2,
  TESTING,
} = process.env

const generateMongoConnectionString = ({ replicaSet, cluster, database, authenticationDatabase = 'admin', username, password }) => `mongodb://${username}:${password}@${cluster.join(',')}/${database}?ssl=true&replicaSet=${replicaSet}&authSource=${authenticationDatabase}`

// GENERATE CONNECTION STRING
export const mongoConnectionStr = generateMongoConnectionString({
  replicaSet: MONGO_REPLICA_SET,
  cluster: [
    MONGO_SHARD_0,
    MONGO_SHARD_1,
    MONGO_SHARD_2,
  ],
  database: DATABASE_NAME,
  username: MONGO_USER,
  password: MONGO_PASSWORD,
})

const state = {
  db: null,
  mode: null,
}

const setState = (db, mode) => {
  state.db = db
  state.mode = mode
}

const TEST_URI = `mongodb://localhost/${DATABASE_NAME}`
const PRODUCTION_URI = mongoConnectionStr
export const MODE_TEST = 'mode_test'
export const MODE_PRODUCTION = 'mode_production'

export const connectToMongoPromise = mode => new Promise((resolve, reject) => {
  console.log(`testing: ${TESTING}`)
  const uri = TESTING === 'true' ? TEST_URI : PRODUCTION_URI
  console.log(uri)
  console.log('connecting to mongo')
  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log('error connecting to mongo', err)
      return reject(err)
    }
    const db = client.db(DATABASE_NAME)
    setState(db, mode)
    return resolve(db)
  })
})

export const getDb = () => state.db
