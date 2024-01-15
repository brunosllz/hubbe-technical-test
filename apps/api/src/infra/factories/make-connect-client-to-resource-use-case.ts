import { PrismaResourceDAO } from '../database/prisma/implementations/prisma-resource-dao'
import { ConnectClientToResourceUseCase } from '@/application/use-cases/connect-client-to-resource'

export function MakeConnectClientToResourceUseCase() {
  const prismaResourceDAO = new PrismaResourceDAO()
  const useCase = new ConnectClientToResourceUseCase(prismaResourceDAO)

  return useCase
}
