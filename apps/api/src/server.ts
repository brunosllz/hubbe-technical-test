import '@/infra/gateways/web-socket'
import { server } from '@/infra/http'

server.listen('3333', () => console.log(`🌱 Server is running on port 3333`))
