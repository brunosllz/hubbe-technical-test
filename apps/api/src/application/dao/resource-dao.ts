import { AsyncMaybe } from '../../core/logic/types/Maybe'
import { Resource } from '../models/resource'

export interface ResourceDAO {
  findBySlug(props: { resourceSlug: string }): AsyncMaybe<Resource>
  save(resource: Resource): Promise<void>
}
