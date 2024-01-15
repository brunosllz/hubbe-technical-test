import { PrismaClientDAO } from '../database/prisma/implementations/prisma-client-dao'
import { PrismaResourceDAO } from '../database/prisma/implementations/prisma-resource-dao'
import { DisconnectClientUseCase } from '@/application/use-cases/disconnect-client'

export function MakeDisconnectClientUseCase() {
  const prismaResourceDAO = new PrismaResourceDAO()
  const prismaClientDAO = new PrismaClientDAO()

  const useCase = new DisconnectClientUseCase(
    prismaClientDAO,
    prismaResourceDAO,
  )

  return useCase
}
