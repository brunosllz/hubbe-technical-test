import { Either, left, right } from '@/core/logic/either'
import { ResourceDAO } from '../dao/resource-dao'

type GetStatusFromRecourseUseCaseRequest = {
  resourceSlug: string
}

type GetStatusFromRecourseUseCaseResponse = Either<Error, { status: boolean }>

export class GetStatusFromRecourseUseCase {
  constructor(private readonly resourceDAO: ResourceDAO) {}

  async execute({
    resourceSlug,
  }: GetStatusFromRecourseUseCaseRequest): Promise<GetStatusFromRecourseUseCaseResponse> {
    try {
      const resource = await this.resourceDAO.findBySlug({ resourceSlug })

      if (!resource) {
        return left(new Error('Resource not found.'))
      }

      return right({ status: resource.status })
    } catch (err) {
      console.error(err)
      const error = new Error('Internal server error.')

      return left(error)
    }
  }
}
