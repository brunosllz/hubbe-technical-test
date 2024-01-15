import { InMemoryResourceDAO } from '../dao/in-memory/in-memory-resource-dao'
import { randomUUID } from 'crypto'
import { ClientList } from '../models/client-list'
import { Resource } from '../models/resource'
import { DisconnectClientUseCase } from './disconnect-client'
import { InMemoryClientDAO } from '../dao/in-memory/in-memory-client-dao'
import { Client } from '../models/client'

describe('DisconnectClientUseCase', () => {
  let clientDAO: InMemoryClientDAO
  let resourceDAO: InMemoryResourceDAO
  let sut: DisconnectClientUseCase

  beforeEach(() => {
    resourceDAO = new InMemoryResourceDAO()
    clientDAO = new InMemoryClientDAO()
    sut = new DisconnectClientUseCase(clientDAO, resourceDAO)
  })

  it('should be able to disconnect a client', async () => {
    const resource: Resource = {
      id: randomUUID(),
      availableConnectionsAmount: 1,
      name: 'Resource Name',
      slug: 'resource-slug',
      status: true,
      connectedClients: new ClientList(),
    }

    const clientId = randomUUID()

    const client: Client = {
      id: clientId,
      joinedResourceSlug: resource.slug,
    }

    resource.connectedClients.add(client)

    resourceDAO.items.push(resource)
    clientDAO.items.push(client)

    const result = await sut.execute({
      clientId,
    })

    expect(result.isRight()).toBe(true)
    expect(resourceDAO.items[0]?.connectedClients.currentItems).toHaveLength(0)
    expect(resource.status).toBe(false)
  })
})
