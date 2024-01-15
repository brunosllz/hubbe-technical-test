import { AsyncMaybe } from '../../../core/logic/types/Maybe'
import { Client } from '../../models/client'
import { ClientDAO } from '../client-dao'


export class InMemoryClientDAO implements ClientDAO {
  items: Client[] = []

  async findById({id}: { id: string }): AsyncMaybe<Client> {
    const client = this.items.find((client) => client.id === id)

    if(!client) {
      return null
    }
    
    return client
  }
}
