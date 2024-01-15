import { InMemoryResourceDAO } from '../dao/in-memory/in-memory-resource-dao'
import { randomUUID } from 'crypto'
import { ClientList } from '../models/client-list'
import { Resource } from '../models/resource'
import { GetStatusFromRecourseUseCase } from './get-status-from-resource'

describe('GetStatusFromRecourseUseCase', () => {
  let resourceDAO: InMemoryResourceDAO
  let sut: GetStatusFromRecourseUseCase

  beforeEach(() => {
    resourceDAO = new InMemoryResourceDAO()
    sut = new GetStatusFromRecourseUseCase(resourceDAO)
  })

  it('should be able to get status from resource', async () => {
    const resource: Resource = {
      id: randomUUID(),
      availableConnectionsAmount: 1,
      name: 'Resource Name',
      slug: 'resource-slug',
      status: false,
      connectedClients: new ClientList(),
    }

    resourceDAO.items.push(resource)

    const result = await sut.execute({
      resourceSlug: resource.slug,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ status: false })
  })
})
