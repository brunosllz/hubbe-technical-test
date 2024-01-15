import { Either, left, right } from '@/core/logic/either'
import { ResourceDAO } from '../dao/resource-dao'

type DisconnectClientFromResourceUseCaseRequest = {
  resourceSlug: string
  clientId: string
}

type DisconnectClientFromResourceUseCaseResponse = Either<
  Error,
  Record<string, never>
>

export class DisconnectClientFromResourceUseCase {
  constructor(private readonly resourceDAO: ResourceDAO) {}

  async execute({
    resourceSlug,
    clientId,
  }: DisconnectClientFromResourceUseCaseRequest): Promise<DisconnectClientFromResourceUseCaseResponse> {
    try {
      const resource = await this.resourceDAO.findBySlug({ resourceSlug })

      if (!resource) {
        return left(new Error('Resource not found.'))
      }

      resource.connectedClients.remove({
        id: clientId,
        joinedResourceSlug: resourceSlug,
      })

      const connectedClients = resource.connectedClients.currentItems

      const connectedClientsIsEqualAvailableConnectionsAmount =
        connectedClients.length === resource.availableConnectionsAmount

      resource.status = connectedClientsIsEqualAvailableConnectionsAmount

      await this.resourceDAO.save(resource)

      return right({})
    } catch (err) {
      console.error(err)
      const error = new Error('Internal server error.')

      return left(error)
    }
  }
}
