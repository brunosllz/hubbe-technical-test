import { AsyncMaybe } from '../../../core/logic/types/Maybe'
import { Resource } from '../../models/resource'
import { ResourceDAO } from '../resource-dao'

export class InMemoryResourceDAO implements ResourceDAO {
  items: Resource[] = []

  async findBySlug(props: { resourceSlug: string }): AsyncMaybe<Resource> {
    const resource = this.items.find(
      (resource) => resource.slug === props.resourceSlug,
    )

    if (!resource) {
      return null
    }

    return resource
  }

  async save(resource: Resource): Promise<void> {
    const index = this.items.findIndex((item) => item.id === resource.id)

    this.items[index] = resource
  }
}
