import { prisma } from '..'
import { Resource } from '@/application/models/resource'
import { ResourceDAO } from '@/application/dao/resource-dao'
import { ResourceMapper } from './mappers/resource-mapper'

export class PrismaResourceDAO implements ResourceDAO {
  async findBySlug({
    resourceSlug,
  }: {
    resourceSlug: string
  }): Promise<Resource | null> {
    const resource = await prisma.resource.findUnique({
      where: { slug: resourceSlug },
      include: { connectedClients: true },
    })

    if (!resource) {
      return null
    }

    return ResourceMapper.toDomain(resource)
  }

  async save(resource: Resource) {
    const { rawResource, rawConnectedClients } =
      ResourceMapper.toPersistence(resource)

    const removedConnectClients = rawConnectedClients.getRemovedItems()
    const newConnectClients = rawConnectedClients.getNewItems()

    const hasRemovedConnectClients = removedConnectClients.length > 0
    const hasNewConnectClients = newConnectClients.length > 0

    if (hasRemovedConnectClients) {
      await prisma.client.deleteMany({
        where: {
          clientId: {
            in: removedConnectClients.map((client) => client.id),
          },
        },
      })
    }

    if (hasNewConnectClients) {
      await prisma.client.createMany({
        data: newConnectClients.map((client) => ({
          clientId: client.id,
          resourceId: rawResource.id,
        })),
      })
    }

    await prisma.resource.update({
      where: { id: rawResource.id },
      data: {
        availableConnectionsAmount: rawResource.availableConnectionsAmount,
        name: rawResource.name,
        slug: rawResource.slug,
        status: rawResource.status,
      },
    })
  }
}
