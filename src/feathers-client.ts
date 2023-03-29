import { createClient } from '../../../feathers-chat-ts/src/client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const host = import.meta.env.VITE_MYAPP_API_URL as string || 'http://localhost:3030'
const socket = io(host, { transports: ['websocket'] })

// @ts-expect-error initial testing
export const api = createClient(socketio(socket), { storage: window.localStorage })
