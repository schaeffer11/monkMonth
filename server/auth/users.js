import inquirer from 'inquirer'
import { createFullUser, putNewPassword } from './userMongooseController'
import connectToMongoose from '../mongoose/mongooseService'


const questions = [
  {
    type: 'input',
    message: 'first name?',
    name: 'firstName',
  },
  {
    type: 'input',
    message: 'last name?',
    name: 'lastName',
  },
  {
    type: 'input',
    message: 'company?',
    name: 'company',
  },
  {
    type: 'input',
    message: 'email?',
    name: 'email',
  },
  {
    type: 'input',
    message: 'password?',
    name: 'password',
  },

]

function handleCommandErrors(e) {
  console.log('Error', e.message)
  process.exit(1)
}

function commandCreateUser() {
  console.log('creating user')
  connectToMongoose().then(async () => {
    const user = await inquirer.prompt(questions).catch(handleCommandErrors)
    const newUser = await createFullUser(user).catch(handleCommandErrors)
    process.exit(0)
  }).catch(() => {
    console.error('could not connect to mongo to create the user')
  })
}

function resetPassword() {
  console.log('Resetting Password')
  connectToMongoose().then(async () => {
    const questionz = [{
      type: 'input',
      message: 'account email?',
      name: 'email',
    },
    {
      type: 'input',
      message: 'new Password?',
      name: 'password',
    }]
    const input = await inquirer.prompt(questionz).catch(handleCommandErrors)
    return putNewPassword(input.email, input.password)
  }).catch((e) => console.error('error creating password!', e))
}

const userCommands = process.argv.slice(2)
const availableCommands = {
  create: commandCreateUser,
  reset: resetPassword
}

// EXECUTE USER COMMAND
if (userCommands.length) {
  const command = availableCommands[userCommands[0]]
  if (command) {
    command()
  }
}
