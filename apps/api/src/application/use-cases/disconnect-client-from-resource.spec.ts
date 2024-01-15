import { InMemoryResourceDAO } from '../dao/in-memory/in-memory-resource-dao'
import { randomUUID } from 'crypto'
import { ClientList } from '../models/client-list'
import { Resource } from '../models/resource'
import { DisconnectClientFromResourceUseCase } from './disconnect-client-from-resource'

describe('DisconnectClientFromResourceUseCase', () => {
  let resourceDAO: InMemoryResourceDAO
  let sut: DisconnectClientFromResourceUseCase

  beforeEach(() => {
    resourceDAO = new InMemoryResourceDAO()
    sut = new DisconnectClientFromResourceUseCase(resourceDAO)
  })

  it('should be able to disconnect a client to a resource', async () => {
    const resource: Resource = {
      id: randomUUID(),
      availableConnectionsAmount: 1,
      name: 'Resource Name',
      slug: 'resource-slug',
      status: true,
      connectedClients: new ClientList(),
    }

    const clientId = randomUUID()

    resource.connectedClients.add({
      id: clientId,
      joinedResourceSlug: resource.slug,
    })

    resourceDAO.items.push(resource)

    expect(resourceDAO.items[0]?.connectedClients.currentItems).toHaveLength(1)

    const result = await sut.execute({
      resourceSlug: resource.slug,
      clientId,
    })

    expect(result.isRight()).toBe(true)
    expect(resourceDAO.items[0]?.connectedClients.currentItems).toHaveLength(0)
    expect(resource.status).toBe(false)
  })

  it('should not be able to disconnect a client to a resource if the resource does not exist', async () => {
    const clientId = randomUUID()

    const result = await sut.execute({
      resourceSlug: 'resource-slug',
      clientId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
    expect(result.value.message).toBe('Resource not found.')
  })
})
