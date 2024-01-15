import { Either, left, right } from '@/core/logic/either'
import { ResourceDAO } from '../dao/resource-dao'
import { ClientDAO } from '../dao/client-dao'
import { Resource } from '../models/resource'

type DisconnectClientUseCaseRequest = {
  clientId: string
}

type DisconnectClientUseCaseResponse = Either<Error, Resource>

export class DisconnectClientUseCase {
  constructor(
    private readonly clientDAO: ClientDAO,
    private readonly resourceDAO: ResourceDAO,
  ) {}

  async execute({
    clientId,
  }: DisconnectClientUseCaseRequest): Promise<DisconnectClientUseCaseResponse> {
    try {
      const client = await this.clientDAO.findById({ id: clientId })

      if (!client) {
        return left(new Error('Resource not found'))
      }

      const resource = await this.resourceDAO.findBySlug({
        resourceSlug: client.joinedResourceSlug,
      })

      if (!resource) {
        return left(new Error('Resource not found'))
      }

      resource.connectedClients.remove({
        id: clientId,
        joinedResourceSlug: resource.slug,
      })

      const connectedClients = resource.connectedClients.currentItems

      const connectedClientsIsEqualAvailableConnectionsAmount =
        connectedClients.length === resource.availableConnectionsAmount

      resource.status = connectedClientsIsEqualAvailableConnectionsAmount

      await this.resourceDAO.save(resource)

      return right(resource)
    } catch (err) {
      console.error(err)
      const error = new Error('Internal server error.')

      return left(error)
    }
  }
}
