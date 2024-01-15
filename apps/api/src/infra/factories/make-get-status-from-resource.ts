import { PrismaResourceDAO } from '../database/prisma/implementations/prisma-resource-dao'
import { GetStatusFromRecourseUseCase } from '@/application/use-cases/get-status-from-resource'

export function MakeGetStatusFromRecourseUseCase() {
  const prismaResourceDAO = new PrismaResourceDAO()
  const useCase = new GetStatusFromRecourseUseCase(prismaResourceDAO)

  return useCase
}
