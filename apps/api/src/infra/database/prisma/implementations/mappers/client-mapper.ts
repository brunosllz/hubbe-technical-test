import { Client } from '@/application/models/client'

export class ClientMapper {
  static toDomain(client: {
    resource: {
      slug: string
    } | null
    clientId: string
  }): Client {
    return {
      id: client.clientId,
      joinedResourceSlug: client.resource?.slug ?? '',
    }
  }
}
