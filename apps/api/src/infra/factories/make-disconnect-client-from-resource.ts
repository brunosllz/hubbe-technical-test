import { DisconnectClientFromResourceUseCase } from '@/application/use-cases/disconnect-client-from-resource'
import { PrismaResourceDAO } from '../database/prisma/implementations/prisma-resource-dao'

export function MakeDisconnectClientFromResourceUseCase() {
  const prismaResourceDAO = new PrismaResourceDAO()

  const useCase = new DisconnectClientFromResourceUseCase(prismaResourceDAO)

  return useCase
}
