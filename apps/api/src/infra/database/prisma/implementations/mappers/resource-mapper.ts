import { ClientList } from '@/application/models/client-list'
import { Resource } from '@/application/models/resource'
import { Resource as RawResource, Client as RawClient } from '@prisma/client'

export class ResourceMapper {
  static toDomain(
    resource: RawResource & { connectedClients: RawClient[] },
  ): Resource {
    return {
      id: resource.id,
      availableConnectionsAmount: resource.availableConnectionsAmount,
      connectedClients: new ClientList(
        resource.connectedClients.map((client) => ({
          id: client.clientId,
          joinedResourceSlug: resource.slug,
        })),
      ),
      name: resource.name,
      slug: resource.slug,
      status: resource.status,
    }
  }

  static toPersistence(resource: Resource) {
    return {
      rawResource: {
        id: resource.id,
        availableConnectionsAmount: resource.availableConnectionsAmount,
        name: resource.name,
        slug: resource.slug,
        status: resource.status,
      },
      rawConnectedClients: resource.connectedClients,
    }
  }
}
