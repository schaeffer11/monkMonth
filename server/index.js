// Load environment variables
import './dotenv'


import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import socketio from 'socket.io'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import pkg from '../package.json'
import api from './api/apiRoutes'
import auth from './auth/authRoutes'

import { MODE_PRODUCTION, connectToMongoPromise } from './mongo/index'
import { findOne, updateOne } from './mongo/odb'


const { PORT } = process.env
export const sessionsCollection = 'sessions'

// TODO: There is an unhandled promise in connect to mongo somewhere
const mongoConnection = connectToMongoPromise(MODE_PRODUCTION).catch(err => console.log('error connecting to mongo', err))

// Initialize App Server
const app = express()

// TODO: Setup a production environment variable
const isProduction = false
const entryPath = path.join(__dirname, (
  !isProduction
    ? '../dist'
    : '/'))


app.use(bodyParser.json({
  expended: true,
})) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}))
app.use(cookieParser())
app.use(bodyParser.text())
app.use(cors())
app.use(compression())
app.use(morgan('dev'))

app.use('/api', api)
app.use('/auth', auth)

// Static Content Delivery
//const home = process.env.DOWN_FOR_MATINENCE ? 'maintenance.html' : 'index.html'
// change above code to use env variable for application downtime.  Hardcoded for now.
const home = 'index.html'

app.use(express.static(entryPath, { index: home }))

////////////////
// Root Paths //
////////////////

app.get('*', (req, res) => {
  const indexPath = path.join(entryPath, home)
  res.sendFile(indexPath)
})

const httpServer = app.listen(PORT, () => {
  console.group(`Initializing ${pkg.name}`)
  console.log(`${process.env.NODE_ENV || 'development'} mode`)
  console.log(`Node ${process.version}`)
  mongoConnection.then((c) => {
    console.log(`Magic happens on port ${httpServer.address().port}`)
    console.groupEnd()
    app.emit('app_started')
  }).catch(err => console.log('wwops', err))
})

export const sio = socketio(httpServer)




