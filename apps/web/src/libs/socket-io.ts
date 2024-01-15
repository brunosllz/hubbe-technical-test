import { io, Socket } from 'socket.io-client'

const resourceSocketClient: Socket = io('http://localhost:3333/resources', {
  autoConnect: false,
})

export { resourceSocketClient }
