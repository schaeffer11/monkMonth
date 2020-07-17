import { Router } from 'express'

import { updateOne, insertOne } from '../mongo/odb'
import { updateSocketSessions } from '../helpers'

const router = Router()

//TODO - testing route file?
router.post('/testSocket', async (req, res) => {
	console.log('inside test socket')
	updateSocketSessions(null, 'testSocket', { test: 1})
})

export default router
