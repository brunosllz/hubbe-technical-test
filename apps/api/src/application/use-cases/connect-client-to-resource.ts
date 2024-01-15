import { Either, left, right } from '@/core/logic/either'
import { ResourceDAO } from '../dao/resource-dao'

type ConnectClientToResourceUseCaseRequest = {
  resourceSlug: string
  clientId: string
}

type ConnectClientToResourceUseCaseResponse = Either<
  Error,
  Record<string, never>
>

export class ConnectClientToResourceUseCase {
  constructor(private readonly resourceDAO: ResourceDAO) {}

  async execute({
    resourceSlug,
    clientId,
  }: ConnectClientToResourceUseCaseRequest): Promise<ConnectClientToResourceUseCaseResponse> {
    try {
      const resource = await this.resourceDAO.findBySlug({ resourceSlug })

      if (!resource) {
        return left(new Error('Resource not found.'))
      }

      const isOnLimitConnections =
        resource.availableConnectionsAmount ===
        resource.connectedClients.currentItems.length

      if (isOnLimitConnections) {
        return left(new Error('Resource is already locked.'))
      }

      resource.connectedClients.add({
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
