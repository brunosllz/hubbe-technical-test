import { ClientList } from './client-list'

export type Resource = {
  id: string
  name: string
  slug: string
  availableConnectionsAmount: number
  status: boolean
  connectedClients: ClientList
}
