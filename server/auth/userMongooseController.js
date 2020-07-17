import emailValidator from 'email-validator'
// import prompt from 'prompt-promise'
import { randomBytes, pbkdf2 } from 'crypto'
import { ObjectID } from 'mongodb'
import { findOne, insertOne, updateOne } from '../mongo/odb'
import { User } from './userSchema'


const createInitialUser = async (user) => {
  const { firstName, lastName, company, email, password } = user

  // TODO - handle failed hash password
  // const hashedPass = await hashPassword(password)

  const newUser = {
    firstName: firstName.replace(/^\w/, c => c.toUpperCase()).trim(),
    lastName: lastName.replace(/^\w/, c => c.toUpperCase()).trim(),
    company: company.trim(),
    email: email.trim(),
    // password: hashedPass,
    datasets: [],
    favoriteCases: [],
    collaboratorOn : [],
    insertionDate: new Date(),
  }

  return User.create(newUser)
}


export async function createFullUser(userObj) {
  const { ...user } = userObj
  const userExists = await User.exists({ email: user.email })
  console.log(userExists)

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



