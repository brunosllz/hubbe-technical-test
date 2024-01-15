import { ConnectClientToResourceUseCase } from './connect-client-to-resource'
import { InMemoryResourceDAO } from '../dao/in-memory/in-memory-resource-dao'
import { randomUUID } from 'crypto'
import { ClientList } from '../models/client-list'
import { Resource } from '../models/resource'

describe('ConnectClientToResourceUseCase', () => {
  let resourceDAO: InMemoryResourceDAO
  let sut: ConnectClientToResourceUseCase

  beforeEach(() => {
    resourceDAO = new InMemoryResourceDAO()
    sut = new ConnectClientToResourceUseCase(resourceDAO)
  })

  it('should be able to connect a client to a resource', async () => {
    const resource: Resource = {
      id: randomUUID(),
      availableConnectionsAmount: 1,
      name: 'Resource Name',
      slug: 'resource-slug',
      status: false,
      connectedClients: new ClientList(),
    }

    resourceDAO.items.push(resource)

    const clientId = randomUUID()

    const result = await sut.execute({ resourceSlug: resource.slug, clientId })

    expect(result.isRight()).toBe(true)
    expect(resourceDAO.items[0]?.connectedClients.currentItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: clientId,
          joinedResourceSlug: resource.slug,
        }),
      ]),
    )
    expect(resource.status).toBe(true)
  })

  it('should not be able to connect a client to a resource if the resource does not exist', async () => {
    const clientId = randomUUID()

    const result = await sut.execute({
      resourceSlug: 'resource-slug',
      clientId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
    expect(result.value.message).toBe('Resource not found.')
  })

  it('should not be able to connect a client to a resource if the resource is already locked', async () => {
    const resource: Resource = {
      id: randomUUID(),
      availableConnectionsAmount: 1,
      name: 'Resource Name',
      slug: 'resource-slug',
      status: false,
      connectedClients: new ClientList(),
    }

    resource.connectedClients.add({
      id: randomUUID(),
      joinedResourceSlug: resource.slug,
    })

    resourceDAO.items.push(resource)

    const connectClientId = randomUUID()

    const result = await sut.execute({
      resourceSlug: resource.slug,
      clientId: connectClientId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
    expect(result.value.message).toBe('Resource is already locked.')
  })
})
