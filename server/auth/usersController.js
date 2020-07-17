import emailValidator from 'email-validator'
// import prompt from 'prompt-promise'
import { randomBytes, pbkdf2 } from 'crypto'
import { ObjectID } from 'mongodb'
import { findOne, insertOne, updateOne } from '../mongo/odb'

const keylen = 64
const iterations = 100000

const createInitialUser = async (user) => {
  const { firstName, lastName, company, email, password } = user

  const newUser = {
    firstName: firstName.replace(/^\w/, c => c.toUpperCase()).trim(),
    lastName: lastName.replace(/^\w/, c => c.toUpperCase()).trim(),
    company: company.trim(),
    email: email.trim(),
    datasets: [],
    favoriteCases: [],
    collaboratorOn: [],
    insertionDate: new Date(),
  }

  return insertOne('user', newUser)
    .then(r => r.ops[0])
    .catch((error) => {
      console.log('should be duplicate', error)
      throw error
    })
}

export async function createFullUser(userObj) {
  const { ...user } = userObj
  console.log('user?', user)
  const userExists = await findOne('user', { email: user.email }, { email: 1 })
  if (userExists) {
    const err = new Error('User already exists')
    err.code = 'USER_ALREADY_EXISTS'
    throw err
  }
  try {
    const newUser = await createInitialUser(user)
    return newUser
  } catch (error) {
    console.log('error?', error)
    if (error.code === 11000) {
      throw Error('USER_ALREADY_EXISTS')
    }
    throw Error('User could not be created')
  }
}


