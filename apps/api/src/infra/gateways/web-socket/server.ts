import { server } from '@/infra/http'
import { Server } from 'socket.io'

const serverIo = new Server(server, { cors: { origin: '*' } })

const resourceIo = serverIo.of('/resources')

export { resourceIo, serverIo }
