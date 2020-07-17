import { sio } from './index'
import { find } from './mongo/odb'

// TODO: Make it take an array of objects (channel, messageObj)
export async function updateSocketSessions(query, channel, messageObj) {
  try {
    // TODO - make this more flexible once we add dataset stuff in
    let { caseId } = messageObj

    Object.keys(sio.sockets.connected).forEach(socketKey => {
    	let socketCaseId =  sio.sockets.connected[socketKey].request._query.caseId

      if (socketCaseId === caseId) {
        sio.sockets.connected[socketKey].emit(channel, messageObj)  
      }
    })
  } catch (error) {
    console.log('there was en error updating sockets', error)
  }
}

