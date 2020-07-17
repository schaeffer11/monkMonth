import { getDb } from './index'

export const insertOne = (collection, doc) => {
  const db = getDb()
  return db.collection(collection).insertOne(doc)
}

export const findOneUpdate = (collection, filter, doc, options = {}) => {
  const db = getDb()
  return db.collection(collection).findOneAndUpdate(filter, doc, options)
}

export const findOne = (collection, query, project = {}, sort = {}) => {
  const db = getDb()
  return db.collection(collection).findOne(query, { projection: project, sort })
}

export const updateOne = (collection, filter, doc, options = {}) => {
  const db = getDb()
  return db.collection(collection).updateOne(filter, doc, options)
}

export const update = (collection, filter, doc, options = {}) => {
  const db = getDb()
  return db.collection(collection).update(filter, doc, options)
}

export const find = (collection, query, project = {}, sort = {}, limit = 0) => {
  const db = getDb()
  const cursor = db.collection(collection).find(query, { projection: project, sort }).limit(limit)
  return cursor.toArray()
}

export const deleteOne = (collection, filter) => {
  const db = getDb()
  return db.collection(collection).deleteOne(filter)
}

export const aggregate = (collection, pipeline, isStream = false) => {
  const db = getDb()
  const aggregation = db.collection(collection).aggregate(pipeline, { allowDiskUse: true })
  if (isStream) {
    return aggregation.stream()
  }
  return aggregation.toArray()
}

export function getCollection(collectionName) {
  return getDb().collection(collectionName)
}