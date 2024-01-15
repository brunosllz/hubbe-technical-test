import { ClientDAO } from '@/application/dao/client-dao'
import { prisma } from '..'
import { ClientMapper } from './mappers/client-mapper'

export class PrismaClientDAO implements ClientDAO {
  async findById({ id }: { id: string }) {
    const client = await prisma.client.findUnique({
      where: {
        clientId: id,
      },
      select: {
        clientId: true,
        resource: {
          select: { slug: true },
        },
      },
    })

    if (!client) {
      return client
    }

    return ClientMapper.toDomain(client)
  }
}
