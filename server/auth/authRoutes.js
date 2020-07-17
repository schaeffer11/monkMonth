import { Router } from 'express'
import { ObjectID } from 'mongodb'

import { Auth } from 'aws-amplify';
import fetch from 'node-fetch';
import { findOne, insertOne, updateOne } from '../mongo/odb'

import { validate } from './userMongooseController'
import { find } from '../mongo/odb'

const router = Router()


// TODO - enable this once we allow reconnecting to old sessions (once we start persisting state)

//This currently is not being used.  -WY 7/12/20
router.post('/reconnect', async (req, res) => {
  console.log('logging in or whatever')

  try {
    const user = await Auth.currentUserInfo()  
    let emailCognito  = user.attributes.email
    console.log('found a cognito user logged in', emailCognito, email)

    if (emailCognito === email) {
      const mongoUser = await findOne('users', { email }, {}).catch(e => e)
      const id = new ObjectID(mongoUser._id)

      const pinned = user.pinnedOpportunities || []
      const pinnedIds = pinned.map(p => new ObjectID(p))
      const opportunities = await find('sgo_opportunity', {
        '_id': { '$in': pinnedIds },
      }, {
        '_id': 1,
        'name': 1,
        'wellId': 1,
        'zone': 1,
        'type': 1,
        'case_id': 1,
      })

      const modifiedUser = { ...mongoUser }
      modifiedUser.pinnedOpportunities = opportunities

      return res.json({
        ...modifiedUser,
      })

    }

    await Auth.signOut()
    return res.status(401).json({ success: false, error: 'No Congito User' })

  } catch {
    return res.status(401).json({ success: false, error: 'No Congito User' })
  }
})



// router.post('/logout', async (req, res) => {
//   await Auth.signOut()

//   res.status(200).json({ success: true })
// })

// router.post('/reconnect', async (req, res) => {
//   await Auth.signOut()

//   res.status(200).json({ success: true })
// })

export default router
