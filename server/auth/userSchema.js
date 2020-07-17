import { Schema, model } from 'mongoose'
import tableNames from '../mongo/tableNames'

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  favoriteCases: { type: [], required: true, default: [] },
  collaboratorOn: { type: [], required: true, default: [] },
  insertionDate: { type: Date, required: true, default: new Date() },
  lastAccessDate: { type: Date, required: true, default: new Date() },
  pinnedOpportunities: { type: [], required: true, default: [] },
})

const userModel = model(tableNames.USER, userSchema)

export {
  userSchema,
  userModel as User,
}
