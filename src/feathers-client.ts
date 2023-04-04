import { createClient } from '../../../feathers-chat-ts/src/client'
import { createVueClient } from 'feathers-pinia'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import { pinia } from './modules/pinia'

const host = 'http://localhost:3030'
const socket = io(host, { transports: ['websocket'] })

export const feathersClient = createClient(socketio(socket), { storage: window.localStorage })
export const api = createVueClient(feathersClient, {
  pinia,
  idField: 'id',
  whitelist: ['$regex'],
  paramsForServer: []
})
